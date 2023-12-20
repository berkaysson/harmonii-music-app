using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;

namespace harmonii.Server.Helpers
{
    public class AdminPanelHelper(UserManager<UserIdentity> userManager)
    {
        private readonly UserManager<UserIdentity> _userManager = userManager;

        public async Task<ApiResponse> GetUserRolesHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null)
            {
                return ApiResponse.CreateErrorResponse([], "User not found");
            }
            var roles = await _userManager.GetRolesAsync(user);
            return ApiResponse.CreateSuccessResponse("User Roles retreved successfully", roles);
        }

        public async Task<ApiResponse> ConfirmUserEmailHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");
            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var result = await _userManager.ConfirmEmailAsync(user, token);
                return result.Succeeded ? 
                    ApiResponse
                    .CreateSuccessResponse("User email confirmed successfully") 
                    :
                    ApiResponse
                    .CreateErrorResponse(result.Errors.ToList(), "Failed to confirm user email");
            }
            else
            {
                return ApiResponse
                    .CreateErrorResponse([], "User email is already confirmed");
            }
        }

        public async Task<ApiResponse> AssignModeratorRoleHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");
            if (await _userManager.IsInRoleAsync(user, "Moderator")) return ApiResponse
                    .CreateErrorResponse([], "User is already moderator");
            var result = await _userManager.AddToRoleAsync(user, "Moderator");
            return result.Succeeded ? 
                ApiResponse.CreateSuccessResponse("Moderator role is assigned to user.")
                :
                ApiResponse.CreateErrorResponse(result.Errors.ToList(), "User not found");
        }

        public async Task<ApiResponse> DeleteUserHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null) return ApiResponse
                    .CreateErrorResponse([], "User not found");
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded ? 
                ApiResponse.CreateSuccessResponse("User deleted successfully")
                :
                ApiResponse
                .CreateErrorResponse(result.Errors.ToList(), "Failed to delete user");
        }

        public ApiResponse GetUnconfirmedUsersHelper()
        {
            var unconfirmedUsers = _userManager.Users.Where(u => !u.EmailConfirmed).ToList();
            return unconfirmedUsers.Count != 0 ?
                ApiResponse.CreateSuccessResponse("Success", unconfirmedUsers)
                :
                ApiResponse.CreateErrorResponse([], "No unconfirmed users found");
        }

        public ApiResponse GetAllUsersHelper()
        {
            var allUsers = _userManager.Users.ToList();
            return allUsers.Count != 0 ?
                ApiResponse.CreateSuccessResponse("Success", allUsers)
                :
                ApiResponse.CreateErrorResponse([], "No user found");
        }
    }
}
