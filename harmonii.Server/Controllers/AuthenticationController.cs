using harmonii.Server.Models;
using harmonii.Server.Models.Authentication.Login;
using harmonii.Server.Models.Authentication.SignUp;
using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly RoleManager<RoleIdentity> _roleManager;
        private readonly IConfiguration _config;
        private readonly SignInManager<UserIdentity> _signInManager;

        public AuthenticationController(UserManager<UserIdentity> userManager,
            RoleManager<RoleIdentity> roleManager, 
            IConfiguration config,
            SignInManager<UserIdentity> signInManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
        }

        // Endpoint for user registration.
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            // Check if the user already exists
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", StatusMessage = "User Already Exist" });
            }

            // Create a new UserIdentity
            UserIdentity user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.UserName
            };

            // Create and UserProfile for relation between UserIdentity
            UserProfile userProfile = UserProfile
                .CreateDefaultUserProfileTemplate(registerUser.UserName);
            user.UserProfile = userProfile;

            // Attempt to create the user in the database
            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Standard");
                return StatusCode(StatusCodes.Status201Created, 
                    new Response { Status = "Success", StatusMessage = "User Created" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", StatusMessage = "User Couldn't Created", Errors = (List<string>)result.Errors });
            }
        }

        // Endpoint for user login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            var user = await _userManager.Users.Include(u => u.UserProfile)
                .FirstOrDefaultAsync(u => u.Email == loginUser.Email);
            var userRoles = await _userManager.GetRolesAsync(user);

            if (user == null)
            {
                return BadRequest(new Response { Status = "Error", StatusMessage = "Invalid credentials" });
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginUser.Password, 
                isPersistent: false, lockoutOnFailure: false);

            // When activate approving users by admin, Check if user email confirmed
            if (result.Succeeded)
            {
                var userProfile = user.UserProfile;
                var token = CreateToken(user);
                var userInfo = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    userProfile?.UserProfileId,
                    userProfile?.UserImageUrl,
                    userRoles,
                    token
                };
                var userInfoString = JsonSerializer.Serialize(userInfo);
                return Ok(new Response { Status = "Success", StatusMessage = userInfoString });
            }

            if (result.IsLockedOut)
            {
                return BadRequest(new Response { Status = "Error", StatusMessage = "User account locked out." });
            }

            return BadRequest(new Response { Status = "Error", StatusMessage = "Email or Password is wrong." });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok(new { Message = "User logged out successfully" });
        }

        private string CreateToken(UserIdentity userIdentity)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, userIdentity.Email),
                new Claim(ClaimTypes.Name, userIdentity.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("JWT:Token").Value!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims:claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials:credentials
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
