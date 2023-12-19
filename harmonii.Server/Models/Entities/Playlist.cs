namespace harmonii.Server.Models.Entities
{
    public class Playlist
    {
        public int PlaylistId { get; set; }
        public string? PlaylistName { get; set; }

        // Relationship with UserProfile, many to one
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        public string? PlaylistDescription { get; set; }

        // Relationship with Songs, many to many
        public ICollection<Song> Songs { get; set; }
    }
}
