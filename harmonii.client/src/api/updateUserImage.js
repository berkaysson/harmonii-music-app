import instance from "../services/api/instance";

export const updateUserImage = async (url) => {
  try {
    const response = await instance
    .put(`/user-profile/update-user-image/${url}`);
    return response;
  } catch (error) {
    return error;
  }
};
