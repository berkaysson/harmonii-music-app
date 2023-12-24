import { useUserContext } from "../../services/hooks/useUser";

const LogoutButton = () => {
  const { logout } = useUserContext();

  const handleLogout = async () => {
    await logout();
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
