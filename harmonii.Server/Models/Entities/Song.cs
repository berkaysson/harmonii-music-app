namespace harmonii.Server.Models.Entities
{
    public class Song
    {
        public int SongId { get; set; }
        public string? SongName { get; set; }
        public string? Artist { get; set;}
        public string? CoverImageUrl {  get; set; }
        public string? AudioFileUrl { get; set; }

        // Relationship with UserProfile, many to one
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        // Relationship with Genre, many to one
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

        // Relationship with playlist, many to many
        public ICollection<Playlist> Playlists { get; set; }
    }
}
