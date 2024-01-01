import { NavLink } from "react-router-dom";
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
import { RiEdit2Line } from "react-icons/ri";
import Logo from "../../assets/harmonii_logo.png";
import { useState } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";

const Navigation = () => {
  const { userValid, userRole, user } = useUserContext();
  const { userPlaylists } = usePlaylistContext();
  const [isNavActive, setIsNavActive] = useState(false);

  const handleNavControl = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <>
      <button id="nav-controller" onClick={handleNavControl}>
        {isNavActive ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
      </button>
      <StyledNavigation isNavActive={isNavActive}>
        <ul>
          <li>
            <LogoLink to="/">
              <img alt="logo" src={Logo} />
              <span>
                harmon<span style={{ textDecoration: "underline" }}>ii</span>
              </span>
            </LogoLink>
          </li>
          {userValid ? (
            <>
              {user && (
                <li>
                  <i>
                    <p style={{ fontSize: "12px" }}>Welcome {user.userName}</p>
                  </i>
                </li>
              )}
              <li>
                <StyledLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/"
                >
                  <span>
                    <RiHome5Line />
                  </span>{" "}
                  Home{" "}
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/profile"
                >
                  <span>
                    <RiUser3Line />
                  </span>{" "}
                  Profile
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/create-playlist"
                >
                  <span>
                    <RiPlayListAddLine />
                  </span>{" "}
                  Create Playlist
                </StyledLink>
              </li>
              {userPlaylists.length > 0 ? (
                <div className="nav-playlist-list">
                  <div>
                    <i>Your Playlists</i>
                  </div>
                  {userPlaylists.map((playlist) => (
                    <li key={playlist.playlistId}>
                      <StyledLink
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        to={`/playlist/${playlist.playlistId}`}
                      >
                        {playlist.playlistName}
                      </StyledLink>
                    </li>
                  ))}
                </div>
              ) : (
                ""
              )}
              <div className="nav-bottom">
                {userRole === "Admin" && (
                  <li>
                    <StyledLink
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      to="/admin-panel"
                    >
                      <span>
                        <RiAdminLine />
                      </span>{" "}
                      Admin Panel
                    </StyledLink>
                  </li>
                )}
                {userRole !== "Standard" && (
                  <li>
                    <StyledLink
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      to="/moderator-panel"
                    >
                      <span>
                        <RiEdit2Line />
                      </span>{" "}
                      Moderator Panel
                    </StyledLink>
                  </li>
                )}
                <LogoutButton id="nav-logout-btn" />
              </div>
            </>
          ) : (
            <>
              <li>
                <StyledLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/login"
                >
                  <span>
                    <RiLoginBoxLine />
                  </span>{" "}
                  Login
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/register"
                >
                  <span>
                    <RiUserAddLine />
                  </span>{" "}
                  Register
                </StyledLink>
              </li>
            </>
          )}
        </ul>
      </StyledNavigation>{" "}
    </>
  );
};

export default Navigation;

const StyledNavigation = styled.nav`
  padding: 2rem;
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 99;
  width: 270px;
  transition: left 0.2s ease;

  @media (max-width: 1300px) {
    left: ${({ isNavActive }) => (isNavActive ? 0 : "-72%")};
    width: 70%;
    backdrop-filter: blur(50px);
    z-index: 999999;
  }

  ul > li {
    padding-bottom: 1rem;
  }

  .nav-bottom {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 160px;
    gap: 1rem;

    @media(max-width: 1300px){
      bottom: 16px;
    }
  }

  .nav-playlist-list {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    li {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  overflow: hidden;
  transition: 0.2s color ease;
  padding: 0.5rem 0.3rem;
  border-radius: 0.2rem;
  transition: background-color 0.2s ease;

  &.active {
    background-color: var(--dark-blue-color);
  }

  span {
    font-size: 24px;
  }

  &:hover {
    color: var(--pink-color);
  }
`;

const LogoLink = styled(NavLink)`
  img {
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
  transition: 0.2s background-color ease;

  &:hover {
    background-color: white;
  }
`;
