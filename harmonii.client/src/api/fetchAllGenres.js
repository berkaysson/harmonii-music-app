import instance from "../services/api/instance";

export const fetchAllGenres = async () => {
  try {
    const response = await instance.get("/genre/all");
    return response;
  } catch (error) {
    return error;
  }
};
