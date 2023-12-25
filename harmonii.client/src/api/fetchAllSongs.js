import instance from "../services/api/instance";

export const fetchAllSongs = async () => {
  try {
    const response = await instance.get("/songs");
    return response;
  } catch (error) {
    return error;
  }
};
