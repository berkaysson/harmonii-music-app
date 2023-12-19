using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace harmonii.Services.Dtos
{
    public class PlaylistDto
    {
        [Required(ErrorMessage = "Playlist name is required")]
        public string PlaylistName { get; set; }

        public string PlaylistDescription { get; set; }
    }
}
