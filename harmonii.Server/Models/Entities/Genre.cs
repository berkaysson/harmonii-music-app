namespace harmonii.Server.Models.Entities
{
    public class Genre
    {
        public int GenreId { get; set; }
        public string? GenreName { get; set; }
        public ICollection<Song> Songs { get; set; } = new List<Song>();
    }
}
