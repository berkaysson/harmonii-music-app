using harmonii.Server.Models.Identity;

namespace harmonii.Server.Models.Entities
{
    public class UserProfile
    {
        public int UserProfileId { get; set; }
        public string? UserName { get; set; }
        public string? UserImageUrl { get; set; }
        public UserIdentity UserIdentity { get; set; }

        public ICollection<Song> Songs { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
    }
}
