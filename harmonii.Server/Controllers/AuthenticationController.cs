using harmonii.Server.Helpers;
using harmonii.Server.Models;
using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
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
        private readonly SignInManager<UserIdentity> _signInManager;
        private readonly AuthenticationHelper _authHelper;

        public AuthenticationController(
            SignInManager<UserIdentity> signInManager,
            AuthenticationHelper authHelper)
        {
            _signInManager = signInManager;
            _authHelper = authHelper;
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
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok(new ApiResponse { Status="Success", StatusMessage = "User logged out successfully" });
        }

        // Endpoint for reset password
    }
}
