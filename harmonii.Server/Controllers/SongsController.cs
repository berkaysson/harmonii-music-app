using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.Identity.EntityFramework;
using harmonii.Server.Data;
using harmonii.Server.Helpers;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SongsController(UserManager<UserIdentity> userManager, 
        ApplicationDbContext dbContext, 
        SongsHelper songsHelper) : Controller
    {
        private readonly UserManager<UserIdentity> _userManager = userManager;
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly SongsHelper _songsHelper = songsHelper;

        // Get all songs
        [HttpGet("all-songs")]
        public async Task<IActionResult> GetAllSongs()
        {
            try
            {
                var songs = await _dbContext.Songs.ToListAsync();
                return Ok(ApiResponse.
                    CreateSuccessResponse("All songs retrieved successfully", songs);
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        // Get song by song name
        [HttpGet("song/{songId}")]
        public async Task<IActionResult> GetSongById(int songId)
        {
            try
            {
                var song = await _dbContext.Songs
                    .FirstOrDefaultAsync(s => s.SongId == songId);
                if (song == null)
                {
                    return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
                }

                return Ok(ApiResponse.CreateSuccessResponse("Song is retrieved successfully", song));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        // Add song (authorize=moderator)
        [HttpPost]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> AddSong([FromBody] SongDto song)
        {
            if (!ModelState.IsValid || song == null)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], "Invalid song data"));
            }

            var userName = User.Identity.Name;
            var result = await _songsHelper.AddSongHelper(song, userName);

            if (result.Status == "Success")
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
        // Delete song (authorize=moderator)
    }
}
