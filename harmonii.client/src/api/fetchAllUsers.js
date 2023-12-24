import instance from "../services/api/api";

export const fetchAllUsers = async () => {
  try {
    const response = await instance.get("/admin/all-users");
    return response;
  } catch (error) {
    console.error(error);
  }
};
