import instance from "../services/api/instance";

export const fetchAllUsers = async () => {
  try {
    const response = await instance.get("/admin/all-users");
    return response;
  } catch (error) {
    return error;
  }
};
