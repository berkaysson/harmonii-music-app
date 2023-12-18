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
        // Get song
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
            var response = await _songsHelper.AddSong(song, userName);

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
        // Get song by genre
    }
}
