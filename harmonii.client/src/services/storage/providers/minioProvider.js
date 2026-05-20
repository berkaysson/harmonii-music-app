import instance from '../../api/instance';
import axios from 'axios';

export const minioProvider = {
  /**
   * Yükleme URL'i talep eder ve dosyayı doğrudan MinIO sunucusuna yükler.
   * @param {File} file - Yüklenecek dosya nesnesi
   * @param {string} folderName - Backend'de beklenen klasör/bucket veya prefix bilgisi
   * @returns {Promise<string>} Yüklenen dosyanın erişilebilir public URL'i
   */
  uploadFile: async (file, folderName) => {
    try {
      // 1. Backend'den Presigned URL Talep Et
      // Not: Bu endpoint projenizin backend yapısına göre güncellenmelidir (örn: /storage/presigned-url)
      const presignedResponse = await instance.post('/storage/presigned-url', {
        fileName: file.name,
        contentType: file.type,
        folder: folderName
      });
      
      const { uploadUrl, fileKey } = presignedResponse.data;

      // 2. Dosyayı doğrudan MinIO'ya PUT et
      // Burada JWT token göndermemek için temiz bir axios instance kullanıyoruz
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // 3. Backend'e gönderilecek olan fileKey bilgisini döndür
      return fileKey;
    } catch (error) {
      console.error('MinIO Upload Error:', error);
      throw error;
    }
  }
};
