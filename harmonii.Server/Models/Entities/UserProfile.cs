using harmonii.Server.Models.Identity;

namespace harmonii.Server.Models.Entities
{
    public class UserProfile
    {
        public int UserProfileId { get; set; }
        public string? UserName { get; set; }
        public string? UserImageUrl { get; set; }

        public int UserIdentityId { get; set; }
        public UserIdentity UserIdentity { get; set; } = new UserIdentity();

        public ICollection<Song> Songs { get; set; } = new List<Song>();
        public ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();

        // Custom method to create a default UserProfile template
        public static UserProfile CreateDefaultUserProfileTemplate(string userName)
        {
            return new UserProfile
            {
                UserName = userName,
                UserImageUrl = null, // Optionally set default UserImageUrl
                Songs = new List<Song>(), // Initialize empty Songs collection
                Playlists = new List<Playlist>() // Initialize empty Playlists collection
            };
        }
    }
}
