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
        public async Task<IActionResult> GetUserProfile()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userName = User.Identity.Name;
                var result = await _userProfileHelper.GetUserProfileHelper(userName);
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
                var result = await _userProfileHelper.UpdateUserImageHelper(userName, url);
                return result.Status == "Success" ? Ok(result) : BadRequest(new { Message = result.StatusMessage });
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet("user-songs")]
        public async Task<IActionResult> GetUserSongs()
        {
            try
            {
                var user = await _userProfileHelper
                    .GetUserIdentityWithProfileByUserName(User.Identity.Name);
                return Ok(user.UserProfile.Songs);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to fetch user songs: " + ex.Message);
            }
        }

        [HttpGet("user-playlists")]
        public async Task<IActionResult> GetUserPlaylists()
        {
            try
            {
                var user = await _userProfileHelper
                    .GetUserIdentityWithProfileByUserName(User.Identity.Name);
                return Ok(user.UserProfile.Playlists);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to fetch user playlists: " + ex.Message);
            }
        }
    }
}
