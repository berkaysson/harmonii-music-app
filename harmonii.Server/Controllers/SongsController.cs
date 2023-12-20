using harmonii.Server.Data;
using harmonii.Server.Helpers;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Controllers
{
    [Route("api/songs")]
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
        [HttpGet]
        public async Task<IActionResult> GetAllSongs()
        {
            var songs = await _dbContext.Songs
                .Include(s => s.Genre).Include(s => s.UserProfile)
                .ToListAsync();
            var songDetailsList = songs.Select(song =>
            _songsHelper.CreateSongDetailsDtoFromSong(song))
                .ToList();
            return Ok(ApiResponse.
                CreateSuccessResponse("All songs retrieved successfully", songDetailsList));
        }

        // Get song by song name
        [HttpGet("{songId}")]
        public async Task<IActionResult> GetSongById(int songId)
        {
            var song = await _dbContext.Songs
                .Include(s => s.Genre).Include(s => s.UserProfile)
                .FirstOrDefaultAsync(s => s.SongId == songId);
            if (song == null)
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            var songDetails = _songsHelper.CreateSongDetailsDtoFromSong(song);
            return Ok(ApiResponse
                .CreateSuccessResponse("Song is retrieved successfully", songDetails));
        }

        // Add song
        [HttpPost]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> AddSong([FromBody] SongDto song)
        {
            if (!ModelState.IsValid || song == null) return BadRequest(
                ApiResponse.CreateErrorResponse([], "Invalid song data"));
            var userName = User.Identity?.Name;
            if (userName == null) return BadRequest(ApiResponse
                .CreateErrorResponse(new List<IdentityError>(), "User not found"));
            var result = await _songsHelper.AddSongHelper(song, userName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Delete song
        [HttpDelete("{songId}")]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> DeleteSong(int songId)
        {
            var song = await _dbContext.Songs.FindAsync(songId);
            if (song == null)
            {
                return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
            }
            _dbContext.Songs.Remove(song);
            await _dbContext.SaveChangesAsync();
            return Ok(ApiResponse.CreateSuccessResponse("Song deleted successfully"));
        }
    }
}
