import instance from '../../api/instance';
import axios from 'axios';

export const minioProvider = {
  /**
   * Requests a presigned upload URL from the backend, then PUTs the file
   * directly to MinIO. Returns the fileKey to be stored in the database.
   *
   * @param {File}     file       - The file object to upload
   * @param {string}   folderName - Ignored (key is generated server-side), kept for API compat
   * @param {Function} onProgress - Optional callback (0–80) tracking upload bytes sent
   * @returns {Promise<string>}   The fileKey stored in MinIO
   */
  uploadFile: async (file, folderName, onProgress) => {
    try {
      // 1. Request a presigned PUT URL from the backend
      const presignedResponse = await instance.get('/storage/upload-url', {
        params: {
          fileName: file.name,
          contentType: file.type,
        },
      });

      const { uploadUrl, fileKey } = presignedResponse.data;

      // 2. PUT the file directly to MinIO (no JWT token — use plain axios)
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            // Scale to 0–80% so the caller can use 80–100% for subsequent steps
            const percent = Math.round((progressEvent.loaded / progressEvent.total) * 80);
            onProgress(percent);
          }
        },
      });

      // 3. Return the fileKey so the caller can persist it via the songs API
      return fileKey;
    } catch (error) {
      console.error('MinIO Upload Error:', error);
      throw error;
    }
  },
};
