import instance from "../services/api/instance";

export const fetchPlaylistsByUser = async () => {
  try {
    const response = await instance
      .get(`/user-profile/playlists`);
    return response;
  } catch (error) {
    return error;
  }
};