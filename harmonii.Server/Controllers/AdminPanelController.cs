using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminPanelController : Controller
    {
        private readonly UserManager<UserIdentity> _userManager;

        public AdminPanelController(UserManager<UserIdentity> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("user-roles/{username}")]
        public async Task<IActionResult> GetUserRoles(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new { Username = username, Roles = roles });
        }
    }
}
