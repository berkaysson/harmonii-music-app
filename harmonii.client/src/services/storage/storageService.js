import { minioProvider } from './providers/minioProvider';

// Strategy Pattern: Aktif sağlayıcı (provider) burada belirlenir.
// İleride AWS S3, Azure Blob vb. eklendiğinde sadece bu referansı değiştirmek yeterlidir.
const activeProvider = minioProvider;

export const storageService = {
  /**
   * Uygulamanın diğer bölümlerine sunulan tekil depolama (upload) arabirimi.
   * @param {File} file - Yüklenecek dosya nesnesi
   * @param {string} folderName - İsteğe bağlı klasör veya kategori adı
   * @returns {Promise<string>} Yüklenen dosyanın URL'i
   */
  uploadFile: async (file, folderName) => {
    return await activeProvider.uploadFile(file, folderName);
  }
};
