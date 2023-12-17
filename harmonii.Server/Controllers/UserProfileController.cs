using harmonii.Server.Models;
using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace harmonii.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserProfileController : Controller
    {
        private readonly UserManager<UserIdentity> _userManager;

        public UserProfileController(UserManager<UserIdentity> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userName = User.Identity.Name;
                var user = await _userManager.Users.Include(u => u.UserProfile)
                    .FirstOrDefaultAsync(u => u.UserName == userName);
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
                    var userInfoString = JsonSerializer.Serialize(userInfo);
                    return Ok(new Response { Status = "Success", StatusMessage = userInfoString });
                }
                else
                {
                    return BadRequest(new { Message = "User not found" });
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut("update-user-image")]
        public async Task<IActionResult> UpdateUserImage(string url)
        {
            if (User.Identity.IsAuthenticated)
            {
                var userName = User.Identity.Name;
                var user = await _userManager.Users.Include(u => u.UserProfile)
                    .FirstOrDefaultAsync(u => u.UserName == userName);

                if (user != null)
                {
                    user.UserProfile.UserImageUrl = url;
                    var result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                    {
                        return Ok(new Response { Status = "Success", StatusMessage = "User image url updated." });
                    }
                    else
                    {
                        return BadRequest(new Response { Status = "Success", StatusMessage = "Failed to update user image URL" });
                    }
                }
                else
                {
                    return BadRequest(new { Message = "User not found" });
                }
            }
            else
            {
                return Unauthorized();
            }
        }
          
}
}
