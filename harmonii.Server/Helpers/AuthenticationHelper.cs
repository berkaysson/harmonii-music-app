using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace harmonii.Server.Helpers
{
    public class AuthenticationHelper
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly IConfiguration _config;
        private readonly SignInManager<UserIdentity> _signInManager;

        public AuthenticationHelper(UserManager<UserIdentity> userManager,
            IConfiguration config,
            SignInManager<UserIdentity> signInManager)
        {
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
        }

        public async Task<Response> RegisterUserHelper(RegisterUser registerUser)
        {
            // Check if the user already exists
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return Response.CreateErrorResponse([], "User Already Exists");
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
                return Response.CreateSuccessResponse("User Created");
            }
            else
            {
                return Response.CreateErrorResponse(result.Errors.ToList(), "User Registration Failed");
            }
        }

        public async Task<Response> LoginUserHelper(LoginUser loginUser)
        {
            var user = await _userManager.FindByEmailAsync(loginUser.Email);
            var userRoles = await _userManager.GetRolesAsync(user);
            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginUser.Password,
                isPersistent: false, lockoutOnFailure: false);

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
                return Response.CreateSuccessResponse(userInfoString);
            }

            else if (result.IsLockedOut)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User account locked out");
            }
            else
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "Invalid credentials");
            }
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
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: credentials
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
