namespace harmonii.Server.Models.Entities
{
    public class Song
    {
        public int SongId { get; set; }
        public string? SongName { get; set; }
        public string? Artist { get; set;}
        public string? CoverImageUrl {  get; set; }
        public string? AudioFileUrl { get; set; }
        public int GenreId { get; set; }
        public int UploadedByUserId { get; set; }

    }
}
