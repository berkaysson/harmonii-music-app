using Microsoft.AspNetCore.Identity;

namespace harmonii.Services.Dtos
{
    public class ApiResponse
    {
        public string? Status { get; set; }
        public string? StatusMessage { get; set; }
        public List<string>? Errors { get; set; }
        public object Data { get; set; }

        public static ApiResponse CreateSuccessResponse(string message = "Success", object? data = null)
        {
            return new ApiResponse { Status = "Success", StatusMessage = message, Data = data };
        }

        public static ApiResponse CreateErrorResponse(List<IdentityError> errors, string message = "Error")
        {
            var errorMessages = errors.Select(e => e.Description).ToList();
            message = errors.Count > 0 ? $"{message} || " + string.Join(", ", errorMessages) : message;
            return new ApiResponse { Status = "Error", StatusMessage = message, Errors = errorMessages };
        }
    }
}
