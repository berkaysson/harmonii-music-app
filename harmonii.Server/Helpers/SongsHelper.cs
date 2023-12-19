using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Helpers
{
    public class SongsHelper
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<UserIdentity> _userManager;
        private readonly UserProfileHelper _userProfileHelper;

        public SongsHelper(UserManager<UserIdentity> userManager
            , ApplicationDbContext dbContext
            , UserProfileHelper userProfileHelper)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _userProfileHelper = userProfileHelper;
        }

        public async Task<ApiResponse> AddSongHelper(SongDto song, string userName)
        {
            var user = await _userProfileHelper.GetUserIdentityWithProfileByUserName(userName);
            if (user == null || user.UserProfile == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            Genre genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.GenreName == song.GenreName);
            if (genre == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Genre not found");
            }

            bool songExists = await SongExists(song.SongName, song.Artist);

            if (songExists)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "This song is already exists");
            }

            var newSong = new Song
            {
                SongName = song.SongName,
                Artist = song.Artist,
                CoverImageUrl = song.CoverImageUrl,
                AudioFileUrl = song.AudioFileUrl,
                Genre = genre,
                UserProfile = user.UserProfile
            };
            try
            {
                _dbContext.Songs.Add(newSong);
                await _dbContext.SaveChangesAsync();
                return ApiResponse.CreateSuccessResponse("Song added successfully");
            }
            catch (Exception ex)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), ex.Message);
            }
        }

        public async Task<List<SongDetailsDto>> GetSongsByUserProfileIdAsync(int userProfileId)
        {
            var songsCreatedByUser = await _dbContext.Songs
                .Where(song => song.UserProfileId == userProfileId)
                .Select(song => new SongDetailsDto
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
                })
                .ToListAsync();

            return songsCreatedByUser;
        }

        public async Task<bool> SongExists(string songName, string artist)
        {
            var normalizedSongName = songName.ToUpper();
            var normalizedArtist = artist.ToUpper();

            return await _dbContext.Songs.AnyAsync(s =>
                s.SongName.ToUpper() == normalizedSongName &&
                s.Artist.ToUpper() == normalizedArtist);
        }
    }
}
