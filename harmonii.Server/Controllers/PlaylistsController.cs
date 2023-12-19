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
                var response = await _playlistHelper.AddSongToPlaylistHelper(playlistId, songId);

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
