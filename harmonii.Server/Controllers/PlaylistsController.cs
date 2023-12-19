using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PlaylistsController : Controller
    {
        private readonly PlaylistHelper _playlistHelper;

        public PlaylistsController(PlaylistHelper playlistHelper)
        {
            _playlistHelper = playlistHelper;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePlaylist([FromBody] PlaylistDto playlistDto)
        {
            try
            {
                var userName = User.Identity.Name;
                var response = await _playlistHelper.CreatePlaylistHelper(playlistDto, userName);

                if (response.Status == "Success")
                {
                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }
        // Update Playlist endpoint (name)
        // Delete playlist endpoint
        // Add song to playlist endpoint
        [HttpPost("{playlistId}/add-song")]
        public async Task<IActionResult> AddSongToPlaylist(int playlistId, int songId)
        {
            try
            {
                var userName = User.Identity?.Name;
                var response = await _playlistHelper
                    .AddSongToPlaylistHelper(playlistId, songId, userName);

                if (response.Status == "Success")
                {
                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }
        // Remove song to playlist endpoint
        [HttpDelete("remove-song-from-playlist")]
        public async Task<IActionResult> RemoveSongFromPlaylist(int playlistId, int songId)
        {
            var userName = User.Identity?.Name;
            var result = await _playlistHelper
                .RemoveSongFromPlaylistHelper(playlistId, songId, userName);

            if (result.Status == "Success")
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        // Get playlist details, songs and name
        [HttpGet("playlist-details/{playlistId}")]
        public async Task<IActionResult> GetPlaylistDetails(int playlistId)
        {
            try
            {
                var playlistDetails = await _playlistHelper.GetPlaylistDetailsHelper(playlistId);

                if (playlistDetails == null)
                {
                    return NotFound(ApiResponse.CreateErrorResponse([], "Playlist not found"));
                }

                return Ok(ApiResponse.CreateSuccessResponse("Playlist details fetched successfully", playlistDetails));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        // Get all playlist name, details and id
    }
}
