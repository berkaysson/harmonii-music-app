using harmonii.Server.Helpers;
using harmonii.Services.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminPanelController : Controller
    {
        private readonly AdminPanelHelper _adminPanelHelper;

        public AdminPanelController(AdminPanelHelper adminPanelHelper)
        {
            _adminPanelHelper = adminPanelHelper;
        }

        [HttpGet("user-roles/{identityId}")]
        public async Task<IActionResult> GetUserRoles(int identityId)
        {
            var result = await _adminPanelHelper.GetUserRoles(identityId);
            return result.Status == "Success" ? Ok(result) : NotFound(new { Message = result.StatusMessage });
        }

        [HttpPost("confirm-user-email/{identityId}")]
        public async Task<IActionResult> ConfirmUserEmail(int identityId)
        {
            var result = await _adminPanelHelper.ConfirmUserEmail(identityId);
            return result.Status == "Success" ? Ok(new { Message = result.StatusMessage }) : BadRequest(new { Message = result.StatusMessage });
        }

        // Create endpoint for assignig moderator
        [HttpPost("assign-moderator/{identityId}")]
        public async Task<IActionResult> AssignModeratorRole(int identityId)
        {
            var result = await _adminPanelHelper.AssignModeratorRole(identityId);
            return result.Status == "Success" ? Ok(new { Message = result.StatusMessage }) 
                : BadRequest(new { Message = result.StatusMessage });
        }

        // Create endpoint for deleting users
        [HttpDelete("delete-user/{identityId}")]
        public async Task<ActionResult> DeleteUser(int identityId)
        {
            var result = await _adminPanelHelper.DeleteUser(identityId);

            return result.Status == "Success" ? Ok(new { Message = result.StatusMessage }) 
                : BadRequest(new { Message = result.StatusMessage });
        }
    }
}
