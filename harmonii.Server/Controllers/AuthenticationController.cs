using harmonii.Server.Helpers;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<UserIdentity> _signInManager;
        private readonly AuthenticationHelper _authHelper;
        private readonly UserManager<UserIdentity> _userManager;

        public AuthenticationController(
            SignInManager<UserIdentity> signInManager,
            AuthenticationHelper authHelper,
            UserManager<UserIdentity> userManager)
        {
            _signInManager = signInManager;
            _authHelper = authHelper;
            _userManager = userManager;
        }

        // Endpoint for user registration.
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            var result = await _authHelper.RegisterUserHelper(registerUser);

            if (result.Status == "Success")
            {
                return Ok(result);
            }
            else if (result.Status == "Error")
            {
                return BadRequest(result);
            }
            else
            {
                return BadRequest("Unexpected result");
            }
        }

        // Endpoint for user login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            var result = await _authHelper.LoginUserHelper(loginUser);

            if (result.Status == "Success")
            {
                return Ok(result);
            }
            else if (result.Status == "Error")
            {
                return BadRequest(result);
            }
            else
            {
                return BadRequest("Unexpected result");
            }
        }

        // Endpoint for user log out.
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();

                return Ok(ApiResponse.CreateSuccessResponse("User logged out successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }

        }

        // Endpoint for reset password
        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePassword changePassword)
        {
            var userName = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return BadRequest(ApiResponse
                    .CreateErrorResponse(new List<IdentityError>(), "User not found"));
            }

            var result = await _userManager
                .ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);
            
            if (result.Succeeded)
            {
                await _signInManager.SignOutAsync();
                return Ok(ApiResponse.CreateSuccessResponse("Password changed successfully"));
            }
            else
            {
                return BadRequest(ApiResponse
                    .CreateErrorResponse(result.Errors.ToList(), "Failed to change password"));
            }
        }
    }
}
