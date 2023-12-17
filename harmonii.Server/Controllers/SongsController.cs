using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    public class SongsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Get all songs
        // Get song
        // Add song (authorize=moderator)
        // Delete song (authorize=moderator)
        // Get song by genre
    }
}
