namespace harmonii.Server.Models.Abstractions;

public class StoragePresignedUrlResponse
{
    public string UploadUrl { get; set; } = string.Empty;
    public string FileKey { get; set; } = string.Empty;
    public DateTime Expiry { get; set; }
}
