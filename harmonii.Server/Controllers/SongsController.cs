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
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to fetch songs: " + ex.Message);
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
                    return NotFound("Song not found");
                }

                return Ok(song);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to fetch song: " + ex.Message);
            }
        }

        // Add song (authorize=moderator)
        [HttpPost]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> AddSong([FromBody] SongDto song)
        {
            if (!ModelState.IsValid || song == null)
            {
                return BadRequest("Invalid song data");
            }

            var userName = User.Identity.Name;
            var response = await _songsHelper.AddSongHelper(song, userName);

            if (response.Status == "Success")
            {
                return Ok(response.StatusMessage);
            }
            else
            {
                return BadRequest(response.StatusMessage);
            }
        }
        // Delete song (authorize=moderator)
    }
}
