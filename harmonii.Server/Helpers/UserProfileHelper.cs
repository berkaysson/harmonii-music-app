using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace harmonii.Server.Helpers
{
    public class UserProfileHelper
    {
        private readonly UserManager<UserIdentity> _userManager;

        public UserProfileHelper(UserManager<UserIdentity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Response> GetUserProfileHelper(string userName)
        {
            var user = await GetUserIdentityWithProfileByUserName(userName);
            var userRoles = await _userManager.GetRolesAsync(user);

            if (user != null)
            {
                var userProfile = user.UserProfile;
                var userInfo = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    userProfile?.UserProfileId,
                    userProfile?.UserImageUrl,
                    userRoles
                };
                // refactor response text
                var userInfoString = JsonSerializer.Serialize(userInfo);
                return Response.CreateSuccessResponse(userInfoString);
            }
            else
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }
        }

        public async Task<Response> UpdateUserImageHelper(string userName, string url)
        {
            var user = await GetUserIdentityWithProfileByUserName(userName);

            if (user != null)
            {
                user.UserProfile.UserImageUrl = url;
                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Response.CreateSuccessResponse("User image URL updated.");
                }
                else
                {
                    return Response.CreateErrorResponse(result.Errors.ToList(), "Failed to update user image URL");
                }
            }
            else
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }
        }

        public async Task<UserIdentity> GetUserIdentityWithProfileByUserName(string userName)
        {
            var user = await _userManager.Users
                .Include(u => u.UserProfile)
                    .ThenInclude(up => up.Songs)
                    .ThenInclude(up => up.Genre)
                .Include(u => u.UserProfile)
                    .ThenInclude(up => up.Playlists)
                .FirstOrDefaultAsync(u => u.UserName == userName);
            return user;
        }
    }
}
