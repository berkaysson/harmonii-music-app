using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : Controller
    {
        private readonly UserProfileHelper _userProfileHelper;

        public UserProfileController(UserProfileHelper userProfileHelper)
        {
            _userProfileHelper = userProfileHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userName = User.Identity.Name;
                var result = await _userProfileHelper.GetUserProfile(userName);
                return result.Status == "Success" ? Ok(result) : BadRequest(new { Message = result.StatusMessage });
            }
            else
            {
                return Unauthorized();
            }
        }

        // Can be extended to uptade all user profile and identity information
        [HttpPut("update-user-image")]
        public async Task<IActionResult> UpdateUserImage(string url)
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userName = User.Identity.Name;
                var result = await _userProfileHelper.UpdateUserImage(userName, url);
                return result.Status == "Success" ? Ok(result) : BadRequest(new { Message = result.StatusMessage });
            }
            else
            {
                return Unauthorized();
            }
        }

        // Create endpoint for getting user's songs

        // Create endpoint for getting user's playlists
    }
}
