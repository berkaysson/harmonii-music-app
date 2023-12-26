import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import UserListComponent from "../components/Home/UserListsComponent";
import ModeratorPanel from "../components/Admin&Moderator/ModeratorPanel";

const AdminPanel = () => {
  const {userRole} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(userRole == "Standard"){
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>
    {
      userRole === "Admin" ? 
      <div id="admin-auth">
        Admin Panel
        <UserListComponent />
      </div> : ""
    }
    <div>
      <ModeratorPanel />
    </div>
  </div>
}

export default AdminPanel;