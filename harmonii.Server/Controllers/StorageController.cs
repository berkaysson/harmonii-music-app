using harmonii.Server.Models.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harmonii.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StorageController(IStorageService storageService) : ControllerBase
    {
        private readonly IStorageService _storageService = storageService;

        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromQuery] string fileName, [FromQuery] string contentType)
        {
            if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(contentType))
                return BadRequest("Dosya adı ve tipi gereklidir.");

            var response = await _storageService.GetUploadUrlAsync(fileName, contentType);
            return Ok(response);
        }
    }
}
