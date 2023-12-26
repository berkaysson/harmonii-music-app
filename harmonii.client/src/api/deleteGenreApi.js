import instance from "../services/api/instance";

export const deleteGenreApi = async (genreId) => {
  try {
    const response = await instance.delete(
      `/genre/${genreId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
