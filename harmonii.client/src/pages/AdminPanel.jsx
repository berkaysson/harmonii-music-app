import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import UserListComponent from "../components/Home/UserListsComponent";

const AdminPanel = () => {
  const {userRole} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(userRole == "Standard"){
      navigate("/");
    }
    console.log(userRole);
  }, []);

  return <div>
    {
      userRole === "Admin" ? 
      <div id="admin-auth">
        <UserListComponent />
      </div> : ""
    }
  
  </div>
}

export default AdminPanel;