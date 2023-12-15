using harmonii.Server.Models;
using harmonii.Server.Models.Authentication.SignUp;
using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly RoleManager<RoleIdentity> _roleManager;
        private readonly IConfiguration _config;
        public AuthenticationController(UserManager<UserIdentity> userManager,
            RoleManager<RoleIdentity> roleManager, 
            IConfiguration config)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _config = config;
        }

        // Endpoint for user registration.
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
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
                return StatusCode(StatusCodes.Status201Created, 
                    new Response { Status = "Success", StatusMessage = "User Created" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", StatusMessage = "User Couldn't Created", Errors = (List<string>)result.Errors });
            }
        }
    }
}
