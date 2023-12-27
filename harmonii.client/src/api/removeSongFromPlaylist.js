import instance from "../services/api/instance";

export const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    const response = await instance.delete(
      `/playlists/${playlistId}/songs/${songId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
