
using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Services.Dtos;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Helpers
{
    public class GenreHelper(ApplicationDbContext dbContext, SongsHelper songsHelper)
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly SongsHelper _songsHelper = songsHelper;

        public async Task<GenreDetailsDto> GetGenreDetailsHelper(int genreId)
        {
            var genre = await _dbContext.Genres
                .Include(g => g.Songs)
                .ThenInclude(g => g.UserProfile)
                .FirstAsync(g => g.GenreId == genreId);
            var genreDetails = CreateGenreDetailsDtoFromGenre(genre);
            return genreDetails;
        }

        public async Task<ApiResponse> CreateGenreHelper(string genreName)
        {
            if (genreName == null || genreName.Length < 3) return ApiResponse
                    .CreateErrorResponse([], "Genre name should be at least 3 character");
            var newGenre = new Genre
            {
                GenreName = genreName
            };
            _dbContext.Add(newGenre);
            await _dbContext.SaveChangesAsync();
            return ApiResponse.CreateSuccessResponse("Genre created successfully");
        }

        public async Task<ApiResponse> DeleteGenreHelper(int genreId)
        {
            var genre = await _dbContext.Genres.Include(g => g.Songs)
                .FirstAsync(g => g.GenreId == genreId);
            if (genre == null) return ApiResponse.
                    CreateErrorResponse([], "Genre not found");
            if (genre.Songs.Count > 0) return ApiResponse
                    .CreateErrorResponse([], "This genre contains songs, it can not be deleted");
            _dbContext.Genres.Remove(genre);
            await _dbContext.SaveChangesAsync();
            return ApiResponse.
                CreateSuccessResponse("Genre deleted successfully");
        }

        public GenreDetailsDto CreateGenreDetailsDtoFromGenre(Genre genre) => new()
        {
            GenreId = genre.GenreId,
            GenreName = genre.GenreName,
            Songs = genre.Songs.Select(song => _songsHelper
            .CreateSongDetailsDtoFromSong(song))
            .ToList()
        };
    }
}
