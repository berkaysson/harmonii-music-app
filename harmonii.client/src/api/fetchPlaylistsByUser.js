import instance from "../services/api/instance";

export const fetchPlaylistByUser = async () => {
  try {
    const response = await instance
      .get(`/user-profile/playlists`);
    return response;
  } catch (error) {
    return error;
  }
};