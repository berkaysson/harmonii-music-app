using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Identity;
using harmonii.Server.Models.Entities;
using harmonii.Server.Data;
using harmonii.Services.Dtos;
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

        public async Task<Response> AddSongHelper(SongDto song, string userName)
        {
            var user = await _userProfileHelper.GetUserIdentityWithProfileByUserName(userName);
            if (user == null || user.UserProfile == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            Genre genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.GenreName == song.GenreName);
            if (genre == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "Genre not found");
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
                return Response.CreateSuccessResponse("Song added successfully");
            }
            catch (Exception ex)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), ex.Message);
            }
        }
    }
}
