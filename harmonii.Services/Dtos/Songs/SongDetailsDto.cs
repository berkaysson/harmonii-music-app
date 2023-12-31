﻿using System.ComponentModel.DataAnnotations;

namespace harmonii.Services.Dtos.Songs
{
    public class SongDetailsDto
    {
        [Required(ErrorMessage = "Song ID is required")]
        public int SongId { get; set; }

        [Required(ErrorMessage = "Song name is required")]
        public string SongName { get; set; }

        [Required(ErrorMessage = "Artist name is required")]
        public string ArtistName { get; set; }

        public string CoverImageUrl { get; set; }
        public string AudioFileUrl { get; set; }

        // create two distinct field to store genre and user information 
        [Required(ErrorMessage = "Genre ID is required")]
        public int GenreId { get; set; }

        [Required(ErrorMessage = "Genre name is required")]
        public string GenreName { get; set; }

        [Required(ErrorMessage = "User profile ID is required")]
        public int UserProfileId { get; set; }

        [Required(ErrorMessage = "User name is required")]
        public string UserName { get; set; }
    }
}
