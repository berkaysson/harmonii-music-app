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

        public async Task<Response> GetUserRoles(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return Response.CreateErrorResponse(new List<IdentityError>(), "User not found");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Response.CreateSuccessResponse("User Roles: " + String.Join(", ", roles));
        }

        public async Task<Response> ConfirmUserEmail(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
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
    }
}
