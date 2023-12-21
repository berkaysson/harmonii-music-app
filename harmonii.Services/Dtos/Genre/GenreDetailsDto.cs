using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using harmonii.Services.Dtos.Songs;

namespace harmonii.Services.Dtos.Genre
{
    public class GenreDetailsDto
    {
        [Required(ErrorMessage = "Genre id is required")]
        public int GenreId { get; set; }

        [Required(ErrorMessage = "Genre name is required")]
        public string GenreName { get; set; }
        public List<SongDetailsDto> Songs { get; set; }
    }
}
