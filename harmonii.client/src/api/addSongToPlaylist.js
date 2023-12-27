import instance from "../services/api/instance";

export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    const response = await instance.post(
      `/playlists/${playlistId}/songs/${songId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
