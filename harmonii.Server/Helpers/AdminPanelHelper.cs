using harmonii.Server.Models.Identity;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace harmonii.Server.Helpers
{
    public class AdminPanelHelper
    {
        private readonly UserManager<UserIdentity> _userManager;

        public AdminPanelHelper(UserManager<UserIdentity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Response> GetUserRolesHelper(int identityId)
        {
            var user = await _userManager.FindByIdAsync(identityId.ToString());
            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Response.CreateSuccessResponse("User Roles: " + String.Join(", ", roles));
        }

        public async Task<Response> ConfirmUserEmailHelper(int identityId)
        {
            var user = await _userManager.FindByNameAsync(identityId.ToString());
            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var result = await _userManager.ConfirmEmailAsync(user, token);

                if (result.Succeeded)
                {
                    return Response.CreateSuccessResponse("User email confirmed successfully");
                }
                else
                {
                    return Response.CreateErrorResponse(result.Errors.ToList(), "Failed to confirm user email");
                }
            }
            else
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User email is already confirmed");
            }
        }

        public async Task<Response> AssignModeratorRoleHelper(int identityId)
        {
            var user = await _userManager.FindByNameAsync(identityId.ToString());

            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            if (await _userManager.IsInRoleAsync(user, "Moderator"))
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User is already moderator");
            }

            var result = await _userManager.AddToRoleAsync(user, "Moderator");

            if (!result.Succeeded)
            {
                return Response.CreateErrorResponse(result.Errors.ToList(), "User not found");
            }

            return Response.CreateSuccessResponse("Moderator role is assigned to user.");
        }

        public async Task<Response> DeleteUserHelper(int identityId)
        {
            var user = await _userManager.FindByNameAsync(identityId.ToString());

            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return Response.CreateErrorResponse(result.Errors.ToList(), "Failed to delete user");
            }

            return Response.CreateSuccessResponse("User deleted successfully");
        }
    }
}
