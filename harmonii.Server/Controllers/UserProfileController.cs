using harmonii.Server.Helpers;
using harmonii.Services.Dtos.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/user-profile")]
    [ApiController]
    [Authorize]
    public class UserProfileController(UserProfileHelper userProfileHelper,
        SongsHelper songsHelper,
        PlaylistHelper playlistHelper) : Controller
    {
        private readonly UserProfileHelper _userProfileHelper = userProfileHelper;
        private readonly SongsHelper _songsHelper = songsHelper;
        private readonly PlaylistHelper _playlistHelper = playlistHelper;

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            var result = await _userProfileHelper.GetUserProfileHelper(userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut("update-user-image")]
        public async Task<IActionResult> UpdateUserImage(string url)
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            var result = await _userProfileHelper.UpdateUserImageHelper(userName, url);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpGet("songs")]
        public async Task<IActionResult> GetUserSongs()
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            var user = await _userProfileHelper
                .GetUserIdentityWithProfileByUserName(userName);
            var songs = await _songsHelper
                .GetSongsByUserProfileIdAsync(user.UserProfile.UserProfileId);
            return Ok(ApiResponse.CreateSuccessResponse("Success", songs));
        }

        [HttpGet("playlists")]
        public async Task<IActionResult> GetUserPlaylists()
        {
            var userName = User.Identity?.Name;
            if (userName == null)
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            var user = await _userProfileHelper
                .GetUserIdentityWithProfileByUserName(userName);
            var playlists = await _playlistHelper
                .GetPlaylistsByUserProfileIdAsync(user.UserProfile.UserProfileId);
            return Ok(ApiResponse.CreateSuccessResponse("Success", playlists));
        }
    }
}
