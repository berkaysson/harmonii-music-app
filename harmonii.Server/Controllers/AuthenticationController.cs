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
    public class AuthenticationController(
        SignInManager<UserIdentity> signInManager,
        AuthenticationHelper authHelper,
        UserManager<UserIdentity> userManager) : ControllerBase
    {
        private readonly SignInManager<UserIdentity> _signInManager = signInManager;
        private readonly AuthenticationHelper _authHelper = authHelper;
        private readonly UserManager<UserIdentity> _userManager = userManager;

        // Endpoint for user registration.
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            var result = await _authHelper.RegisterUserHelper(registerUser);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Endpoint for user login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            var result = await _authHelper.LoginUserHelper(loginUser);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
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
            var result = await _authHelper.ChangePasswordHelper(changePassword);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }
    }
}
