import instance from "../services/api/instance";

export const deletePlaylistApi = async (playlistId) => {
  try {
    const response = await instance.delete(
      `/playlists/${playlistId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
