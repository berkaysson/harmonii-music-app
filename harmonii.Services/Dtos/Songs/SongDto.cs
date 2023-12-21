using System.ComponentModel.DataAnnotations;

namespace harmonii.Services.Dtos.Songs
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
