import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import UserListComponent from "../components/Home/UserListsComponent";
import ModeratorPanel from "../components/Admin&Moderator/ModeratorPanel";
import styled from "styled-components";

const AdminPanel = () => {
  const {userRole} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(userRole == "Standard"){
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledAdminPage>
    <div>
      <ModeratorPanel />
    </div>
    
    {
      userRole === "Admin" ? 
      <>
      <hr />
      <div id="admin-auth">
        
        Admin Panel
        <UserListComponent />
      </div></> : ""
    }
  </StyledAdminPage>
}

export default AdminPanel;

const StyledAdminPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;