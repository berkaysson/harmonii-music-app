import instance from "../services/api/instance";

export const deleteUserApi = async (identityId) => {
  try {
    const response = await instance.delete(
      `/admin/delete-user/${identityId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
