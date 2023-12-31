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
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import Logo from "../../assets/harmonii_logo.png";

const Navigation = () => {
  const { userValid, userRole, user } = useUserContext();
  const { userPlaylists } = usePlaylistContext();

  return (
    <StyledNavigation>
      <ul>
        {userValid ? (
          <>
            <li>
              <LogoLink to="/">
                <img alt="logo" src={Logo} />
                <span>harmon<span style={{textDecoration: "underline"}}>ii</span></span>
              </LogoLink>
            </li>
            {
              user && 
              <li>
                <i>
                <p style={{fontSize: "12px"}}>Welcome {user.userName}</p>
                </i>
              </li>
            }
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
                userPlaylists.length > 0 ? 
                <div className="nav-playlist-list">
                  <h3><i>Your Playlists</i></h3>
                  {userPlaylists.map((playlist) => (
                    <li key={playlist.playlistId}>
                      <StyledLink to={`/playlist/${playlist.playlistId}`}>{playlist.playlistName}</StyledLink>
                    </li>
                  ))}
                </div> : ""
              }
            <div className="nav-bottom">
              {
                userRole !== "Standard" &&
                <li>
                  <StyledLink to="/admin-panel"><span><RiAdminLine /></span> Admin Panel</StyledLink>
                </li>
              }
              <LogoutButton id="nav-logout-btn" />
            </div>
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

  .nav-bottom{
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 8%;
    gap: 1rem;
  }

  .nav-playlist-list{
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    gap: .4rem;

    li{
      text-decoration: underline;

      &:hover{
        text-decoration: none;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  overflow: hidden;
  
  span{
    font-size: 24px;
  }

  &:hover{
    color: var(--pink-color);
  }
`;

const LogoLink = styled(Link)`
  img{
    height: 50px;
    width: 50px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  color: var(--dark-blue-color);
  border-radius: 100rem;
  padding: 8px;
  font-weight: bold;
  background-color: var(--pink-color);

  &:hover{
    background-color: white;
  }
`;