using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace harmonii.Services.Dtos
{
    public class SongDto
    {
        [Required(ErrorMessage = "Song name is required")]
        public string SongName { get; set; }

        [Required(ErrorMessage = "Artist name is required")]
        public string Artist { get; set; }

        //[Url(ErrorMessage = "Cover image URL is not valid")]
        public string CoverImageUrl { get; set; }

        //[Url(ErrorMessage = "Audio file URL is not valid")]
        public string AudioFileUrl { get; set; }

        [Required(ErrorMessage = "Genre name is required")]
        public string GenreName { get; set; }
    }

}
