using harmonii.Server.Models.Abstractions;
using harmonii.Server.Models.Storage;
using Minio;
using Minio.DataModel.Args;

namespace harmonii.Server.Services;

public class MinioStorageService : IStorageService
{
    private readonly IMinioClient _minioClient;
    private readonly IMinioClient _signingClient;
    private readonly string _bucketName;

    public MinioStorageService(IMinioClient minioClient, IConfiguration configuration)
    {
        _minioClient = minioClient;
        _bucketName = configuration["Minio:BucketName"] ?? "harmonii-bucket";

        _signingClient = new MinioClient()
            .WithEndpoint(configuration["Minio:ExternalEndpoint"])
            .WithCredentials(configuration["Minio:AccessKey"], configuration["Minio:SecretKey"])
            .WithSSL(false)
            .Build();
    }

    public async System.Threading.Tasks.Task<harmonii.Server.Models.Abstractions.StoragePresignedUrlResponse> GetUploadUrlAsync(string fileName, string contentType, long expirationMinutes = 15)
    {
        if (string.IsNullOrWhiteSpace(contentType))
        {
            throw new ArgumentException("ContentType must be provided to restrict the upload signature.", nameof(contentType));
        }

        var fileKey = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";

        // Content-Type başlığını imza sürecine dahil ederek, istemcinin farklı bir tipte dosya yüklemesini kısıtlıyoruz.
        var headers = new Dictionary<string, string> { { "Content-Type", contentType } };

        var args = new PresignedPutObjectArgs()
            .WithBucket(_bucketName)
            .WithObject(fileKey)
            .WithExpiry((int)TimeSpan.FromMinutes(expirationMinutes).TotalSeconds)
            .WithHeaders(headers);

        // İmzalamayı _signingClient üzerinden yapıyoruz
        string url = await _signingClient.PresignedPutObjectAsync(args);

        return new harmonii.Server.Models.Abstractions.StoragePresignedUrlResponse
        {
            UploadUrl = url,
            FileKey = fileKey,
            Expiry = DateTime.UtcNow.AddMinutes(expirationMinutes)
        };
    }

    public async Task<string> GetDownloadUrlAsync(string fileKey, long expirationMinutes = 60)
    {
        var args = new PresignedGetObjectArgs()
            .WithBucket(_bucketName)
            .WithObject(fileKey)
            .WithExpiry((int)TimeSpan.FromMinutes(expirationMinutes).TotalSeconds);

        // İmzalamayı _signingClient üzerinden yapıyoruz
        return await _signingClient.PresignedGetObjectAsync(args);
    }
}