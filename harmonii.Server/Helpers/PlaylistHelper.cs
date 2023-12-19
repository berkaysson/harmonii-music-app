using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace harmonii.Server.Helpers
{
    public class PlaylistHelper
    {
        private readonly ApplicationDbContext _dbContext;

        public PlaylistHelper(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        public async Task<ApiResponse> CreatePlaylistHelper(PlaylistDto playlistDto, string userName)
        {
            try
            {
                var user = await _dbContext.Users
                    .Include(u => u.UserProfile)
                    .FirstOrDefaultAsync(u => u.UserName == userName);

                if (user == null || user.UserProfile == null)
                {
                    return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
                }

                var newPlaylist = new Playlist
                {
                    PlaylistName = playlistDto.PlaylistName,
                    UserProfile = user.UserProfile,
                    PlaylistDescription = playlistDto.PlaylistDescription,
                };

                _dbContext.Playlists.Add(newPlaylist);
                await _dbContext.SaveChangesAsync();

                return ApiResponse.CreateSuccessResponse("Playlist created successfully");
            }
            catch (Exception ex)
            {
                return ApiResponse.CreateErrorResponse([], "Failed to create playlist");
            }
        }

        public async Task<List<Playlist>> GetPlaylistsByUserProfileIdAsync(int userProfileId)
        {
            var playlistCreatedByUser = await _dbContext.Playlists
                .Where(playlist => playlist.UserProfileId == userProfileId)
                .Select(playlist => new Playlist
                {
                    PlaylistId = playlist.PlaylistId,
                    PlaylistName = playlist.PlaylistName,
                    PlaylistDescription = playlist.PlaylistDescription,
                    UserProfileId = playlist.UserProfileId,
                    Songs = playlist.Songs
                })
                .ToListAsync();

            return playlistCreatedByUser;
        }
    }
}