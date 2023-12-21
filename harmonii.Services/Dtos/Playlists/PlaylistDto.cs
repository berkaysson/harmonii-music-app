using System.ComponentModel.DataAnnotations;

namespace harmonii.Services.Dtos.Playlists
{
    public class PlaylistDto
    {
        [Required(ErrorMessage = "Playlist name is required")]
        public string PlaylistName { get; set; }

        public string PlaylistDescription { get; set; }
    }
}
