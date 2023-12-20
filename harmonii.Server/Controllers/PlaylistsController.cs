using harmonii.Server.Data;
using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [ApiController]
    [Route("api/playlists")]
    [Authorize]
    public class PlaylistsController(PlaylistHelper playlistHelper, ApplicationDbContext dbContext) : Controller
    {
        private readonly PlaylistHelper _playlistHelper = playlistHelper;
        private readonly ApplicationDbContext _dbContext = dbContext;

        [HttpPost]
        public async Task<IActionResult> CreatePlaylist([FromBody] PlaylistDto playlistDto)
        {

            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                    .CreateErrorResponse([], "User not found"));
            var result = await _playlistHelper.CreatePlaylistHelper(playlistDto, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut("{playlistId}")]
        public async Task<IActionResult> UpdatePlaylistInfo(int playlistId, string name, string description)
        {
            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                    .CreateErrorResponse([], "User not found"));
            var result = await _playlistHelper
                .UpdatePlaylistInfoHelper(playlistId, name, description, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpDelete("{playlistId}")]
        public async Task<IActionResult> DeletePlaylist(int playlistId)
        {
            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                    .CreateErrorResponse([], "User not found"));
            var result = await _playlistHelper
                .DeletePlaylistHelper(playlistId, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpPost("{playlistId}/songs/{songId}")]
        public async Task<IActionResult> AddSongToPlaylist(int playlistId, int songId)
        {
            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                    .CreateErrorResponse([], "User not found"));
            var result = await _playlistHelper
                .AddSongToPlaylistHelper(playlistId, songId, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpDelete("{playlistId}/songs/{songId}")]
        public async Task<IActionResult> RemoveSongFromPlaylist(int playlistId, int songId)
        {
            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                    .CreateErrorResponse([], "User not found"));
            var result = await _playlistHelper
                .RemoveSongFromPlaylistHelper(playlistId, songId, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpGet("playlist-details/{playlistId}")]
        public async Task<IActionResult> GetPlaylistDetails(int playlistId)
        {
            var playlistDetails = await _playlistHelper.GetPlaylistDetailsHelper(playlistId);
            if (playlistDetails == null) return NotFound(ApiResponse
                .CreateErrorResponse([], "Playlist not found"));
            return Ok(ApiResponse
                .CreateSuccessResponse("Playlist details fetched successfully", playlistDetails));
        }

        [HttpGet("all")]
        public IActionResult GetAllPlaylists()
        {
            var playlists = _dbContext.Playlists.Select(playlist => new
            {
                playlist.PlaylistId,
                playlist.PlaylistName,
                playlist.PlaylistDescription,
                playlist.UserProfileId,
                playlist.UserProfile.UserName,
            }).ToList();
            return Ok(ApiResponse
                .CreateSuccessResponse("Retrieved all playlists successfully", playlists));
        }
    }
}
