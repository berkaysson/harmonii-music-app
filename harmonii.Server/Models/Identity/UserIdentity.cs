using harmonii.Server.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace harmonii.Server.Models.Identity
{
    public class UserIdentity : IdentityUser<int>
    {
        public UserProfile UserProfile { get; set; }
    }
}
