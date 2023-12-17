using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    public class PlaylistsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Create playlist endpoint
        // Update Playlist endpoint (name)
        // Delete playlist endpoint
        // Add song to playlist endpoint
        // Remove song to playlist endpoint
        // Get playlist details, songs and name
        // Get all playlist name, details and id
    }
}
