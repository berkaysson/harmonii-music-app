import instance from "../services/api/instance";

export const logoutApi = async () => {
  try{
    const response = await instance.post("/auth/logout");
    return response;
  }
  catch(error){
    console.error(error);
  }
}