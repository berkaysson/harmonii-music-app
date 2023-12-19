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
                return BadRequest("Failed to create playlist: " + ex.Message);
            }
        }
        // Update Playlist endpoint (name)
        // Delete playlist endpoint
        // Add song to playlist endpoint
        // Remove song to playlist endpoint
        // Get playlist details, songs and name
        // Get all playlist name, details and id
    }
}
