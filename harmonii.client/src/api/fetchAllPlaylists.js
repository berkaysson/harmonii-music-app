import instance from "../services/api/instance";

export const fetchAllPlaylists = async () => {
  try {
    const response = await instance.get("/playlists/all");
    return response;
  } catch (error) {
    return error;
  }
};