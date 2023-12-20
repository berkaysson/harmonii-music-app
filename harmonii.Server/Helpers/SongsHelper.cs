using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Helpers
{
    public class SongsHelper(UserManager<UserIdentity> userManager
            , ApplicationDbContext dbContext
            , UserProfileHelper userProfileHelper)
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly UserManager<UserIdentity> _userManager = userManager;
        private readonly UserProfileHelper _userProfileHelper = userProfileHelper;

        public async Task<ApiResponse> AddSongHelper(SongDto song, string userName)
        {
            var user = await _userProfileHelper.GetUserIdentityWithProfileByUserName(userName);
            if (user == null || user.UserProfile == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");

            Genre genre = await _dbContext.Genres
                .FirstOrDefaultAsync(g => g.GenreName == song.GenreName);
            if (genre == null) return ApiResponse
                    .CreateErrorResponse([], "Genre not found");
            if (await SongExists(song.SongName, song.Artist)) return ApiResponse
                    .CreateErrorResponse([], "This song is already exists");

            var newSong = new Song
            {
                SongName = song.SongName,
                Artist = song.Artist,
                CoverImageUrl = song.CoverImageUrl,
                AudioFileUrl = song.AudioFileUrl,
                Genre = genre,
                UserProfile = user.UserProfile
            };
            _dbContext.Songs.Add(newSong);
            await _dbContext.SaveChangesAsync();
            return ApiResponse.CreateSuccessResponse("Song added successfully");
        }

        public async Task<List<SongDetailsDto>> GetSongsByUserProfileIdAsync(int userProfileId)
        {
            var songsCreatedByUser = await _dbContext.Songs
                .Where(song => song.UserProfileId == userProfileId)
                .ToListAsync();
            var songDetailsList = songsCreatedByUser
                .Select(song => CreateSongDetailsDtoFromSong(song))
                .ToList();
            return songDetailsList;
        }

        public async Task<bool> SongExists(string songName, string artist)
        {
            if(songName == null || artist == null) return false;
            var normalizedSongName = songName.ToUpper();
            var normalizedArtist = artist.ToUpper();
            return await _dbContext.Songs.AnyAsync(s =>
                s.SongName.ToUpper() == normalizedSongName &&
                s.Artist.ToUpper() == normalizedArtist);
        }

        public SongDetailsDto CreateSongDetailsDtoFromSong(Song song) => new()
        {
            SongId = song.SongId,
            SongName = song.SongName,
            ArtistName = song.Artist,
            CoverImageUrl = song.CoverImageUrl,
            AudioFileUrl = song.AudioFileUrl,
            GenreId = song.GenreId,
            GenreName = song.Genre.GenreName,
            UserProfileId = song.UserProfileId,
            UserName = song.UserProfile.UserName
        };
    }
}
