import instance from "../services/api/instance";

export const changePasswordApi = async (passwordData) => {
  try {
    const response = await instance.post(
      `/auth/change-password`, passwordData
    );
    return response;
  } catch (error) {
    return error;
  }
};
