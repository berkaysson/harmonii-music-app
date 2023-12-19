using System.ComponentModel.DataAnnotations;

namespace harmonii.Services.Dtos
{
    public class PlaylistDto
    {
        [Required(ErrorMessage = "Playlist name is required")]
        public string PlaylistName { get; set; }

        public string PlaylistDescription { get; set; }
    }
}
