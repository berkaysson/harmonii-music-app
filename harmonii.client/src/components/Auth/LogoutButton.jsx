import axios from "axios";
import instance from "../../services/api/api";
import { useUserContext } from "../../services/hooks/useUser";

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://localhost:7291/api/auth/logout',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmVya2F5c29uZWwiLCJqdGkiOiI1ZjJjNjQ2NC0zMTVkLTRjMDEtOWJjOS01YjY4YmQxNjZmZDYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiU3RhbmRhcmQiLCJNb2RlcmF0b3IiLCJBZG1pbiJdLCJleHAiOjE3MDM2MDAwNjksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTEiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MTczIn0.l2-BT52dXA2oOL6tQaixPu6JcfhbPhhqdHWGFFpU55s'
  }
};

const LogoutButton = () => {
  const { logout } = useUserContext();

  const handleLogout = async () => {
    console.log(instance.defaults);
    try {
      const response = await axios.request(config);
      console.log(instance.defaults);
      logout();
      console.log("logout successful", response);
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
