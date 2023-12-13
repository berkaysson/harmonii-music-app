namespace harmonii.Server.Models.Entities
{
    public class Playlist
    {
        public int PlaylistId { get; set; }
        public string? PlaylistName { get; set;}
        public int CreatedByUserId { get; set; }
        public string? PlaylistDescription { get; set; }
    }
}
