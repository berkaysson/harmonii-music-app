using harmonii.Server.Data;
using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace harmonii.Server.Controllers
{
    [ApiController]
    [Route("api/playlists")]
    [Authorize]
    public class PlaylistsController : Controller
    {
        private readonly PlaylistHelper _playlistHelper;
        private readonly ApplicationDbContext _dbContext;

        public PlaylistsController(PlaylistHelper playlistHelper, ApplicationDbContext dbContext)
        {
            _playlistHelper = playlistHelper;
            _dbContext = dbContext;
        }

        [HttpPost]
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
        [HttpPut("{playlistId}")]
        public async Task<IActionResult> UpdatePlaylistInfo(int playlistId, string name, string description)
        {
            try
            {
                var playlist = await _dbContext.Playlists.FindAsync(playlistId);
                if (playlist == null)
                {
                    return NotFound(ApiResponse.CreateErrorResponse([], "Playlist Not Found"));
                }

                var currentUserName = User.Identity.Name;
                var playlistUserProfile = await _dbContext.UserProfiles.FindAsync(playlist.UserProfileId);
                if (playlistUserProfile.UserName != currentUserName)
                {
                    return Unauthorized(ApiResponse
                        .CreateErrorResponse(new List<IdentityError>(), "Unauthorized: You're not the creator of this playlist"));
                }

                playlist.PlaylistDescription = description;
                playlist.PlaylistName = name;
                await _dbContext.SaveChangesAsync();
                return Ok(ApiResponse.CreateSuccessResponse("Playlist info updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        // Delete playlist endpoint
        [HttpDelete("{playlistId}")]
        public async Task<IActionResult> DeletePlaylist(int playlistId)
        {
            try
            {
                var playlist = await _dbContext.Playlists.FindAsync(playlistId);
                if (playlist == null)
                {
                    return NotFound(ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Playlist Not Found"));
                }

                var currentUserName = User.Identity.Name;
                var playlistUserProfile = await _dbContext.UserProfiles.FindAsync(playlist.UserProfileId);
                if (playlistUserProfile.UserName != currentUserName)
                {
                    return Unauthorized(ApiResponse
                        .CreateErrorResponse(new List<IdentityError>(), "Unauthorized: You're not the creator of this playlist"));
                }

                _dbContext.Playlists.Remove(playlist);
                await _dbContext.SaveChangesAsync();

                return Ok(ApiResponse.CreateSuccessResponse("Playlist deleted successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse(new List<IdentityError>(), ex.Message));
            }
        }

        // Add song to playlist endpoint
        [HttpPost("{playlistId}/songs/{songId}")]
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
        [HttpDelete("{playlistId}/songs/{songId}")]
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

        // Get all playlist name, details and id [HttpGet("all")]
    }
}
