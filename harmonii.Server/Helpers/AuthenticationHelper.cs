using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public async Task<ApiResponse> RegisterUserHelper(RegisterUser registerUser)
        {
            // Check if the user already exists
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return ApiResponse.CreateErrorResponse([], "User Already Exists");
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
                // refactor response data
                return ApiResponse.CreateSuccessResponse("User Created successfully", user);
            }
            else
            {
                return ApiResponse.CreateErrorResponse(result.Errors.ToList(), "User Registration Failed");
            }
        }

        public async Task<ApiResponse> LoginUserHelper(LoginUser loginUser)
        {
            var user = await _userManager.FindByEmailAsync(loginUser.Email);
            // check for unconfirmed email
            if (user == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginUser.Password,
                isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var token = CreateToken(user);
                var userInfo = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    userRoles,
                    token
                };
                return ApiResponse.CreateSuccessResponse("User login succesfully", userInfo);
            }

            else if (result.IsLockedOut)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User account locked out");
            }
            else
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Invalid credentials");
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
