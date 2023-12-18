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

        [HttpGet("user-roles/{username}")]
        public async Task<IActionResult> GetUserRoles(string username)
        {
            var result = await _adminPanelHelper.GetUserRoles(username);
            return result.Status == "Success" ? Ok(result) : NotFound(new { Message = result.StatusMessage });
        }

        [HttpPost("confirm-user-email/{username}")]
        public async Task<IActionResult> ConfirmUserEmail(string username)
        {
            var result = await _adminPanelHelper.ConfirmUserEmail(username);
            return result.Status == "Success" ? Ok(new { Message = result.StatusMessage }) : BadRequest(new { Message = result.StatusMessage });
        }

        // Create endpoint for assignig moderator
        [HttpPost("assign-moderator/{username}")]
        public async Task<IActionResult> AssignModeratorRole(string username)
        {
            var result = await _adminPanelHelper.AssignModeratorRole(username);
            return result.Status == "Success" ? Ok(new { Message = result.StatusMessage }) 
                : BadRequest(new { Message = result.StatusMessage });
        }

        // Create endpoint for deleting users

    }
}
