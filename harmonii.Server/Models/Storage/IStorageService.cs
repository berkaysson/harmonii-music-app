using harmonii.Server.Models.Abstractions;

namespace harmonii.Server.Models.Storage;

public interface IStorageService
{
    Task<StoragePresignedUrlResponse> GetUploadUrlAsync(string fileName, string contentType, long expirationMinutes = 15);
}
