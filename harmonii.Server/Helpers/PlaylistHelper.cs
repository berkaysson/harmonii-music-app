using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Helpers
{
    public class PlaylistHelper(ApplicationDbContext dbContext, SongsHelper songsHelper)
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly SongsHelper _songsHelper = songsHelper;

        public async Task<ApiResponse> CreatePlaylistHelper(PlaylistDto playlistDto, string userName)
        {
            var user = await _dbContext.Users
                .Include(u => u.UserProfile)
                .FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null || user.UserProfile == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");
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

        public async Task<List<PlaylistDetailsDto>> GetPlaylistsByUserProfileIdAsync(int userProfileId)
        {
            var playlistsCreatedByUser = await _dbContext.Playlists
                .Where(playlist => playlist.UserProfileId == userProfileId)
                .ToListAsync();
            var playlistDetails = playlistsCreatedByUser
                .Select(CreatePlaylistDetailsDtoFromPlaylist)
                .ToList();
            return playlistDetails;
        }

        public async Task<ApiResponse> AddSongToPlaylistHelper(int playlistId, int songId, string userName)
        {
            var playlist = await _dbContext.Playlists.Include(p => p.Songs)
                .Include(p => p.UserProfile)
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistId);
            var song = await _dbContext.Songs.FindAsync(songId);
            if (playlist == null || song == null) return ApiResponse
                    .CreateErrorResponse([], "Playlist or Song not found");
            if (playlist.UserProfile.UserName != userName) return ApiResponse
                    .CreateErrorResponse([], 
                    "Playlist does not belong to the current user");
            if (playlist.Songs.Any(s => s.SongId == songId)) return ApiResponse
                    .CreateErrorResponse([], 
                    "Song already exists in the playlist");
            playlist.Songs.Add(song);
            await _dbContext.SaveChangesAsync();
            return ApiResponse
                .CreateSuccessResponse("Song added to playlist successfully");
        }

        public async Task<ApiResponse> RemoveSongFromPlaylistHelper(int playlistId, int songId, string userName)
        {
            var playlist = await _dbContext.Playlists
                .Include(p => p.Songs).Include(p => p.UserProfile)
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistId);
            if (playlist == null) return ApiResponse
                    .CreateErrorResponse([], "Playlist not found");
            if (playlist.UserProfile.UserName != userName) return ApiResponse
                    .CreateErrorResponse([],
                    "Playlist does not belong to the current user");
            var song = playlist.Songs.FirstOrDefault(s => s.SongId == songId);
            if (song == null) return ApiResponse
                    .CreateErrorResponse([], 
                    "Song not found");
            playlist.Songs.Remove(song);
            await _dbContext.SaveChangesAsync();
            return ApiResponse
                .CreateSuccessResponse("Song removed from the playlist");
        }

        public async Task<PlaylistDetailsDto> GetPlaylistDetailsHelper(int playlistId)
        {
            var playlist = await _dbContext.Playlists
                .Include(p => p.Songs)
                .ThenInclude(s => s.Genre)
                .Include(p => p.Songs)
                .ThenInclude(s => s.Genre)
                .Include(p => p.UserProfile)
                .FirstAsync(p => p.PlaylistId == playlistId);
            var playlistDetails = CreatePlaylistDetailsDtoFromPlaylist(playlist);
            return playlistDetails;
        }

        public async Task<ApiResponse> UpdatePlaylistInfoHelper(int playlistId, string name, string description, string userName)
        {
            var playlist = await _dbContext.Playlists.FindAsync(playlistId);
            if (playlist == null) return ApiResponse
                    .CreateErrorResponse([], "Playlist Not Found");
            var playlistUserProfile = await _dbContext.UserProfiles.FindAsync(playlist.UserProfileId);
            if (playlistUserProfile == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");
            if (playlistUserProfile.UserName != userName) return ApiResponse
                    .CreateErrorResponse([],
                    "Unauthorized: You're not the creator of this playlist");
            playlist.PlaylistDescription = description;
            playlist.PlaylistName = name;
            await _dbContext.SaveChangesAsync();
            return ApiResponse
                .CreateSuccessResponse("Playlist info updated successfully");
        }

        public async Task<ApiResponse> DeletePlaylistHelper(int playlistId, string userName)
        {
            var playlist = await _dbContext.Playlists.FindAsync(playlistId);
            if (playlist == null) return ApiResponse
                    .CreateErrorResponse([], 
                    "Playlist Not Found");
            var playlistUserProfile = await _dbContext.UserProfiles.FindAsync(playlist.UserProfileId);
            if (playlistUserProfile == null) return ApiResponse
                    .CreateErrorResponse([], 
                    "User not found");
            if (playlistUserProfile.UserName != userName) return ApiResponse
                    .CreateErrorResponse([],
                    "Unauthorized: You're not the creator of this playlist");
            _dbContext.Playlists.Remove(playlist);
            await _dbContext.SaveChangesAsync();
            return ApiResponse
                .CreateSuccessResponse("Playlist deleted successfully");
        }

        public PlaylistDetailsDto CreatePlaylistDetailsDtoFromPlaylist(Playlist playlist) => new()
        {
            PlaylistId = playlist.PlaylistId,
            PlaylistName = playlist.PlaylistName,
            PlaylistDescription = playlist.PlaylistDescription,
            UserProfileId = playlist.UserProfileId,
            UserName = playlist.UserProfile.UserName,
            Songs = playlist.Songs.Select(_songsHelper
            .CreateSongDetailsDtoFromSong)
            .ToList()
        };
    }
}