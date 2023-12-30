import styled from "styled-components";
import { useUserContext } from "../../services/hooks/useUser";
import { RiLogoutBoxLine } from "react-icons/ri";

const LogoutButton = () => {
  const { logout } = useUserContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <StyledLogoutButton type="button" onClick={handleLogout}>
        <span><RiLogoutBoxLine /></span>
        Logout
      </StyledLogoutButton>
    </div>
  );
};

export default LogoutButton;

const StyledLogoutButton = styled.button`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  span{
    font-size: 24px;
  }
`;