using harmonii.Server.Data;
using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/genre")]
    [ApiController]
    [Authorize]
    public class GenresController(GenreHelper genreHelper, ApplicationDbContext dbContext) : Controller
    {
        private readonly GenreHelper _genreHelper = genreHelper;
        private readonly ApplicationDbContext _dbContext = dbContext;

        // Get genre
        [HttpGet("{genreId}")]
        public async Task<IActionResult> GetGenreDetails(int genreId)
        {
            var genreDetails = await _genreHelper.GetGenreDetailsHelper(genreId);
            if (genreDetails == null) return NotFound(ApiResponse
                .CreateErrorResponse([], "Genre not found"));
            return Ok(ApiResponse
                .CreateSuccessResponse("Genre details fetched successfully", genreDetails));
        }

        // Get all genres
        [HttpGet("all")]
        public IActionResult GetAllGenres()
        {
            var genres = _dbContext.Genres.Select(genre => new
            {
                genre.GenreId,
                genre.GenreName
            }).ToList();
            return Ok(ApiResponse
                .CreateSuccessResponse("Retrieved all genres successfully", genres));
        }

        // Create genre
        [HttpPost()]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> CreateGenre(string genreName)
        {
            var result = await _genreHelper.CreateGenreHelper(genreName);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Delete genre
        [HttpDelete]
        [Authorize(Roles = "Moderator")]
        public async Task<IActionResult> DeleteGenre(int genreId)
        {
            var result = await _genreHelper.DeleteGenreHelper(genreId);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }
    }
}
