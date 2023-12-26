import instance from "../services/api/instance";

export const createSongApi = async (songData) => {
  try{
    const response = await instance.post("/songs", songData);
    return response;
  }
  catch(error){
    return error;
  }
}