﻿using harmonii.Server.Data;
using harmonii.Server.Models.Entities;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

        // add a check if the current user equal to creator of playlist
        public async Task<ApiResponse> AddSongToPlaylistHelper(int playlistId, int songId, string userName)
        {
            try
            {
                var playlist = await _dbContext.Playlists.Include(p => p.Songs)
                    .Include(p => p.UserProfile)
                    .FirstOrDefaultAsync(p => p.PlaylistId == playlistId);
                var song = await _dbContext.Songs.FindAsync(songId);

                if (playlist == null || song == null)
                {
                    return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Playlist or Song not found");
                }

                if (playlist.UserProfile.UserName != userName)
                {
                    return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Playlist does not belong to the current user");
                }

                if (playlist.Songs.Any(s => s.SongId == songId))
                {
                    return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Song already exists in the playlist");
                }

                playlist.Songs.Add(song);

                await _dbContext.SaveChangesAsync();

                return ApiResponse.CreateSuccessResponse("Song added to playlist successfully");
            }
            catch (Exception ex)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), ex.Message);
            }
        }

        // add a check if the current user equal to creator of playlist
        public async Task<ApiResponse> RemoveSongFromPlaylistHelper(int playlistId, int songId, string userName)
        {
            var playlist = await _dbContext.Playlists
                .Include(p => p.Songs).Include(p => p.UserProfile)
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistId);

            if (playlist == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Playlist not found");
            }


            if (playlist.UserProfile.UserName != userName)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Playlist does not belong to the current user");
            }

            var song = playlist.Songs.FirstOrDefault(s => s.SongId == songId);
            if (song == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "Song not found");
            }
            try
            {
                playlist.Songs.Remove(song);

                await _dbContext.SaveChangesAsync();

                return ApiResponse.CreateSuccessResponse("Song removed from the playlist");
            }

            catch (Exception ex)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), ex.Message);
            }
        }

        public async Task<PlaylistDetailsDto> GetPlaylistDetailsHelper(int playlistId)
        {
            var playlistDetails = await _dbContext.Playlists
                .Where(playlist => playlist.PlaylistId == playlistId)
                .Select(playlist => new PlaylistDetailsDto
                {
                    PlaylistId = playlist.PlaylistId,
                    PlaylistName = playlist.PlaylistName,
                    PlaylistDescription = playlist.PlaylistDescription,
                    UserProfileId = playlist.UserProfileId,
                    UserName = playlist.UserProfile.UserName,
                    Songs = playlist.Songs.Select(song => new SongDetailsDto
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
                    }).ToList()
                })
                    .FirstOrDefaultAsync();

            return playlistDetails;
        }
    }
}