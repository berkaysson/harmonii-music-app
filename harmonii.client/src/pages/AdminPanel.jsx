import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import UserListComponent from "../components/Home/UserListsComponent";
import styled from "styled-components";

const AdminPanel = () => {
  const {userRole} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(userRole == "Standard" || userRole == "Moderator"){
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledAdminPage>
    {
      userRole === "Admin" ? 
      <div id="admin-auth">
        <h2>Admin Panel</h2>
        <UserListComponent />
      </div> : ""
    }
  </StyledAdminPage>
}

export default AdminPanel;

const StyledAdminPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;