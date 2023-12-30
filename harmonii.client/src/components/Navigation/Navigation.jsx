import { Link } from "react-router-dom";
import { useUserContext } from "../../services/hooks/useUser";
import LogoutButton from "../Auth/LogoutButton";
import styled from "styled-components";
import { RiHome5Line } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiUserAddLine } from "react-icons/ri";
import { RiPlayListAddLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";

const Navigation = () => {
  const { userValid, userRole, user } = useUserContext();
  return (
    <StyledNavigation>
      <ul>
        {userValid ? (
          <>
            <li>
              <StyledLink to="/">
                logo
              </StyledLink>
            </li>
            <li>
              <i>
              <p style={{fontSize: "12px"}}>Welcome {user.userName}</p>
              </i>
            </li>
            <li>
              <StyledLink to="/"><span><RiHome5Line /></span> Home </StyledLink>
            </li>
            <li>
              <StyledLink to="/profile"><span><RiUser3Line /></span> Profile</StyledLink>
            </li>
            <li>
              <StyledLink to="/create-playlist"><span><RiPlayListAddLine /></span> Create Playlist</StyledLink>
            </li>
            {
              userRole !== "Standard" &&
              <li>
                <StyledLink to="/admin-panel"><span><RiAdminLine /></span> Admin Panel</StyledLink>
              </li>
            }
            <LogoutButton id="nav-logout-btn" />
          </>
        ) : (
          <>
            <li>
              <StyledLink to="/login"><span><RiLoginBoxLine /></span> Login</StyledLink>
            </li>
            <li>
              <StyledLink to="/register"><span><RiUserAddLine /></span> Register</StyledLink>
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