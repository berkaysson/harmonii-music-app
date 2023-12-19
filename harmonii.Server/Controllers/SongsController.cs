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
            try
            {
                // implement SongDetailsDto
                var songs = await _dbContext.Songs.ToListAsync();
                return Ok(ApiResponse.
                    CreateSuccessResponse("All songs retrieved successfully", songs));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }

        // Get song by song name
        [HttpGet("{songId}")]
        public async Task<IActionResult> GetSongById(int songId)
        {
            try
            {
                var song = await _dbContext.Songs
                    .Include(s => s.Genre).Include(s => s.UserProfile)
                    .FirstOrDefaultAsync(s => s.SongId == songId);
                if (song == null)
                {
                    return NotFound(ApiResponse.CreateErrorResponse([], "Song not found"));
                }

                var songDetails = new SongDetailsDto
                {
                    SongId = songId,
                    SongName = song.SongName,
                    ArtistName = song.Artist,
                    CoverImageUrl = song.CoverImageUrl,
                    AudioFileUrl = song.AudioFileUrl,
                    GenreId = song.GenreId,
                    GenreName = song.Genre.GenreName,
                    UserProfileId = song.UserProfileId,
                    UserName = song.UserProfile.UserName
                };

                return Ok(ApiResponse.CreateSuccessResponse("Song is retrieved successfully", songDetails));
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
        [HttpDelete("{songId}")]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> DeleteSong(int songId)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.CreateErrorResponse([], ex.Message));
            }
        }
    }
}
