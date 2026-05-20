import { minioProvider } from './providers/minioProvider';

// Strategy Pattern: active provider is set here.
// Switch to AWS S3, Azure Blob, etc. by swapping this reference.
const activeProvider = minioProvider;

export const storageService = {
  /**
   * Uploads a file via the active storage provider.
   *
   * @param {File}     file       - The file object to upload
   * @param {string}   folderName - Optional folder / category hint for the provider
   * @param {Function} onProgress - Optional progress callback receiving a 0–80 integer
   * @returns {Promise<string>}   The fileKey of the uploaded object
   */
  uploadFile: async (file, folderName, onProgress) => {
    return await activeProvider.uploadFile(file, folderName, onProgress);
  },
};
