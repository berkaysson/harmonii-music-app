import instance from "../services/api/instance";

export const confirmUserApi = async (identityId) => {
  try {
    const response = await instance.post(
      `/admin/confirm-user-email/${identityId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
