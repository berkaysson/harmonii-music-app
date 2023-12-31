import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import ModeratorPanelComponent from "../components/Admin&Moderator/ModeratorPanel";
import styled from "styled-components";
import { motion } from "framer-motion";

const ModeratorPanel = () => {
  const { userRole } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole == "Standard") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledModeratorPage
    className="main__container"
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: .2 }}
    >
      <div>
        <ModeratorPanelComponent />
      </div>
    </StyledModeratorPage>
  );
};

export default ModeratorPanel;

const StyledModeratorPage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
