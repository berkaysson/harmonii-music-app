import instance from "../services/api/instance";

export const registerApi = async (registerData) => {
  try{
    const response = await instance.post("/auth/register", registerData);
    return response;
  }
  catch(error){
    return error;
  }
}