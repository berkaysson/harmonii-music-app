import instance from "../services/api/instance";

export const createGenreApi = async (genreName) => {
  try{
    const response = await instance.post(`/genre/${genreName}`);
    return response;
  }
  catch(error){
    return error;
  }
}