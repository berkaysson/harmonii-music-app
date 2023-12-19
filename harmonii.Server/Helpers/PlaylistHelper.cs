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
    }
}