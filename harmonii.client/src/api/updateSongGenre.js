import instance from "../services/api/instance";

export const updateSongGenre = async (songId, genreName) => {
  try {
    const response = await instance
    .put(`/songs/${songId}/${genreName}`);
    return response;
  } catch (error) {
    return error;
  }
};
