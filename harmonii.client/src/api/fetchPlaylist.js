import instance from "../services/api/instance";

export const fetchPlaylist = async (playlistId) => {
  try {
    const response = await instance
      .get(`/playlists/playlist-details/${playlistId}`);
    return response;
  } catch (error) {
    return error;
  }
};