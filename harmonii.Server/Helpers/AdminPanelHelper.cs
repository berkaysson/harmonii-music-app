using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;

namespace harmonii.Server.Helpers
{
    public class AdminPanelHelper
    {
        private readonly UserManager<UserIdentity> _userManager;

        public AdminPanelHelper(UserManager<UserIdentity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ApiResponse> GetUserRolesHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return ApiResponse.CreateSuccessResponse("User Roles retreved successfully", roles);
        }

        public async Task<ApiResponse> ConfirmUserEmailHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var result = await _userManager.ConfirmEmailAsync(user, token);

                if (result.Succeeded)
                {
                    return ApiResponse.CreateSuccessResponse("User email confirmed successfully");
                }
                else
                {
                    return ApiResponse.CreateErrorResponse(result.Errors.ToList(), "Failed to confirm user email");
                }
            }
            else
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User email is already confirmed");
            }
        }

        public async Task<ApiResponse> AssignModeratorRoleHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());

            if (user == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            if (await _userManager.IsInRoleAsync(user, "Moderator"))
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User is already moderator");
            }

            var result = await _userManager.AddToRoleAsync(user, "Moderator");

            if (!result.Succeeded)
            {
                return ApiResponse.CreateErrorResponse(result.Errors.ToList(), "User not found");
            }

            return ApiResponse.CreateSuccessResponse("Moderator role is assigned to user.");
        }

        public async Task<ApiResponse> DeleteUserHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());

            if (user == null)
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return ApiResponse.CreateErrorResponse(result.Errors.ToList(), "Failed to delete user");
            }

            return ApiResponse.CreateSuccessResponse("User deleted successfully");
        }

        public ApiResponse GetUnconfirmedUsersHelper()
        {
            var unconfirmedUsers = _userManager.Users.Where(u => !u.EmailConfirmed).ToList();

            if (unconfirmedUsers.Any())
            {
                return ApiResponse.CreateSuccessResponse("Success", unconfirmedUsers);
            }
            else
            {
                return ApiResponse.CreateErrorResponse(new List<IdentityError>(), "No unconfirmed users found");
            }
        }
    }
}
