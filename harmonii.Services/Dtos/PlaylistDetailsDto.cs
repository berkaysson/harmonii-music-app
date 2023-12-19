using System.ComponentModel.DataAnnotations;

namespace harmonii.Services.Dtos
{
    public class PlaylistDetailsDto
    {
        [Required(ErrorMessage = "Playlist ID is required")]
        public int PlaylistId { get; set; }

        [Required(ErrorMessage = "Playlist name is required")]
        public string PlaylistName { get; set; }

        public string PlaylistDescription { get; set; }

        [Required(ErrorMessage = "User profile ID is required")]
        public int UserProfileId { get; set; }

        [Required(ErrorMessage = "User name is required")]
        public string UserName { get; set; }

        // Can store only ids of songs
        public List<SongDetailsDto> Songs { get; set; }
    }
}
