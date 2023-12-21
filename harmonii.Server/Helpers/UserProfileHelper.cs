using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace harmonii.Server.Helpers
{
    public class UserProfileHelper(UserManager<UserIdentity> userManager)
    {
        private readonly UserManager<UserIdentity> _userManager = userManager;

        public async Task<ApiResponse> GetUserProfileHelper(string userName)
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
                return ApiResponse.CreateSuccessResponse("User information get successful", userInfo);
            }
            return ApiResponse.CreateErrorResponse([], "User not found");
        }

        public async Task<ApiResponse> UpdateUserImageHelper(string userName, string url)
        {
            var user = await GetUserIdentityWithProfileByUserName(userName);
            if (user != null)
            {
                user.UserProfile.UserImageUrl = url;
                var result = await _userManager.UpdateAsync(user);
                return result.Succeeded ? 
                    ApiResponse
                    .CreateSuccessResponse("User image URL updated.", user.UserProfile.UserImageUrl)
                    :
                    ApiResponse
                    .CreateErrorResponse(result.Errors.ToList(), "Failed to update user image URL");
            }
            return ApiResponse.CreateErrorResponse([], "User not found");
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
