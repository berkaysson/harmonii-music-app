using harmonii.Server.Helpers;
using harmonii.Server.Models.Entities;
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
        private readonly SongsHelper _songsHelper;
        private readonly PlaylistHelper _playlistHelper;

        public UserProfileController(UserProfileHelper userProfileHelper, 
            SongsHelper songsHelper,
            PlaylistHelper playlistHelper)
        {
            _userProfileHelper = userProfileHelper;
            _songsHelper = songsHelper;
            _playlistHelper = playlistHelper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserProfile()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var userName = User.Identity.Name;
                var result = await _userProfileHelper.GetUserProfileHelper(userName);
                return result.Status == "Success" ? Ok(result) : BadRequest(result);
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
                return result.Status == "Success" ? Ok(result) : BadRequest(result);
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
                string userName = User.Identity.Name;
                var user = await _userProfileHelper.GetUserIdentityWithProfileByUserName(userName);
                var songs = await _songsHelper.GetSongsByUserProfileIdAsync(user.UserProfile.UserProfileId);
                return Ok(ApiResponse.CreateSuccessResponse("Success", songs));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        [HttpGet("user-playlists")]
        public async Task<IActionResult> GetUserPlaylists()
        {
            try
            {
                string userName = User.Identity.Name;
                var user = await _userProfileHelper.GetUserIdentityWithProfileByUserName(userName);
                var playlists = await _playlistHelper.GetPlaylistsByUserProfileIdAsync(user.UserProfile.UserProfileId);
                return Ok(ApiResponse.CreateSuccessResponse("Success", playlists));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }
    }
}
