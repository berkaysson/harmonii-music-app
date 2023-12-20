using harmonii.Server.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminPanelController(AdminPanelHelper adminPanelHelper) : Controller
    {
        private readonly AdminPanelHelper _adminPanelHelper = adminPanelHelper;

        [HttpGet("user-roles/{identityId}")]
        public async Task<IActionResult> GetUserRoles(int identityId)
        {
            var result = await _adminPanelHelper.GetUserRolesHelper(identityId);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        [HttpPost("confirm-user-email/{identityId}")]
        public async Task<IActionResult> ConfirmUserEmail(int identityId)
        {
            var result = await _adminPanelHelper.ConfirmUserEmailHelper(identityId);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Create endpoint for assignig moderator
        [HttpPost("assign-moderator/{identityId}")]
        public async Task<IActionResult> AssignModeratorRole(int identityId)
        {
            var result = await _adminPanelHelper.AssignModeratorRoleHelper(identityId);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Create endpoint for deleting users
        [HttpDelete("delete-user/{identityId}")]
        public async Task<IActionResult> DeleteUser(int identityId)
        {
            var result = await _adminPanelHelper.DeleteUserHelper(identityId);
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Get all unconfirmed users
        [HttpGet("unconfirmed-users")]
        public IActionResult GetUnconfirmedUsers()
        {
            var result = _adminPanelHelper.GetUnconfirmedUsersHelper();
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }

        // Get all users
        [HttpGet("all-users")]
        public IActionResult GetAllUsers()
        {
            var result = _adminPanelHelper.GetAllUsersHelper();
            return result.Status == "Success" ? Ok(result)
                : BadRequest(result);
        }
    }
}
