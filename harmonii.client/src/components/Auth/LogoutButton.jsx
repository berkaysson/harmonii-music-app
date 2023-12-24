import { useUserContext } from "../../services/hooks/useUser";
import instance from "../../services/api/api";

const LogoutButton = () => {
  const { logout } = useUserContext();

  const handleLogout = async () => {
    try {
      const response = await instance.post("/auth/logout");
      logout();
      console.log("Logout successful", response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
