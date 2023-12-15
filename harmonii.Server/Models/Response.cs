using Microsoft.AspNetCore.Identity;

namespace harmonii.Server.Models
{
    public class Response
    {
        public string? Status { get; set; }
        public string? StatusMessage { get; set;}
        public List<string>? Errors { get; set; }

        public static Response CreateSuccessResponse(string message = "Success")
        {
            return new Response { Status = "Success", StatusMessage = message };
        }

        public static Response CreateErrorResponse(List<IdentityError> errors, string message = "Error")
        {
            var errorMessages = errors.Select(e => e.Description).ToList();
            return new Response { Status = "Error", StatusMessage = message, Errors = errorMessages };
        }
    }
}
