import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import UserListComponent from "../components/Home/UserListsComponent";
import styled from "styled-components";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const {userRole} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(userRole == "Standard" || userRole == "Moderator"){
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledAdminPage
    className="main__container"
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: .2 }}
  >
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

const StyledAdminPage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;