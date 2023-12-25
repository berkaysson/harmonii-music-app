import instance from "../services/api/instance";

export const loginApi = async (email, password) => {
  try{
    const response = await instance.post("/auth/login", {
      email, password
    });
    return response;
  }
  catch(error){
    return error;
  }
}