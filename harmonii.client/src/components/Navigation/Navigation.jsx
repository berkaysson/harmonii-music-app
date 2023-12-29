import { Link } from "react-router-dom";
import { useUserContext } from "../../services/hooks/useUser";
import LogoutButton from "../Auth/LogoutButton";
import styled from "styled-components";

const Navigation = () => {
  const { userValid } = useUserContext();

  return (
    <StyledNavigation>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/create-playlist">Create Playlist</Link>
        </li>
        <li>
          <Link to="/admin-panel">Admin Panel</Link>
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
  grid-area: 1/1/3/2;
  border: 1px solid red;
`;
