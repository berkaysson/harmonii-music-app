import instance from "../services/api/instance";

export const deleteSongApi = async (songId) => {
  try {
    const response = await instance.delete(
      `/songs/${songId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
