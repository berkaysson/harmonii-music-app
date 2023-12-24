import instance from "../services/api/api";

export const logoutApi = async () => {
  try{
    const response = await instance.post("/auth/logout");
    return response;
  }
  catch(error){
    console.error(error);
  }
}