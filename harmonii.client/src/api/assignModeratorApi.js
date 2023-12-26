import instance from "../services/api/instance";

export const assignModeratorApi = async (identityId) => {
  try {
    const response = await instance.post(
      `/admin/assign-moderator/${identityId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
