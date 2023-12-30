import { Link } from "react-router-dom";
import { useUserContext } from "../../services/hooks/useUser";
import LogoutButton from "../Auth/LogoutButton";
import styled from "styled-components";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";

const Navigation = () => {
  const { userValid } = useUserContext();

  return (
    <StyledNavigation>
      <ul>
        <li>
          <StyledLink to="/"><span><CiHome /></span> Home </StyledLink>
        </li>
        <li>
          <StyledLink to="/profile"><span><CiUser /></span> Profile</StyledLink>
        </li>
        <li>
          <StyledLink to="/create-playlist"><span><CiGrid2H /></span> Create Playlist</StyledLink>
        </li>
        <li>
          <StyledLink to="/admin-panel"><span><CiLock /></span> Admin Panel</StyledLink>
        </li>
        {userValid ? (
          <LogoutButton />
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </StyledNavigation>
  );
};

export default Navigation;

const StyledNavigation = styled.nav`
  grid-area: 1/1/4/2;
  background-color: var(--turq-color-1);
  padding: 1.5rem;

  ul > li{
    padding-bottom: 1rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  span{
    font-size: 24px;
  }

  &:hover{
    color: var(--pink-color);
  }
`;