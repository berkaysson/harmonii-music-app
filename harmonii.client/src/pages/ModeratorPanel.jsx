import { useEffect } from "react";
import { useUserContext } from "../services/hooks/useUser";
import { useNavigate } from "react-router";
import ModeratorPanelComponent from "../components/Admin&Moderator/ModeratorPanel";
import styled from "styled-components";

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
    <StyledModeratorPage>
      <div>
        <ModeratorPanelComponent />
      </div>
    </StyledModeratorPage>
  );
};

export default ModeratorPanel;

const StyledModeratorPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
