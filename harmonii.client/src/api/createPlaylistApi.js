import instance from "../services/api/instance";

export const createPlaylistApi = async (playlistData) => {
  try{
    const response = await instance.post("/playlists", playlistData);
    return response;
  }
  catch(error){
    return error;
  }
}