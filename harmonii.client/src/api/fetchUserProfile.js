import instance from "../services/api/instance";

export const fetchUserProfile = async () => {
  try {
    const response = await instance.get("/user-profile/profile");
    return response;
  } catch (error) {
    return error;
  }
};
