import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import styled from "styled-components";
import { StyledList } from "../Shared/StyledList";

const UserPlaylistsList = () => {
  const { userPlaylists, fetchUserPlaylists } = usePlaylistContext();

  useEffect(() => {
    fetchUserPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Your Playlists</h2>
      <br />

      <StyledList>
        {userPlaylists.map((playlist) => (
          <Link
            key={playlist.playlistId}
            to={`/playlist/${playlist.playlistId}`}
          >
            <StyledPlaylistListItem>
              <span>Playlist Name: {playlist.playlistName}</span>
              <span>Creator: {playlist.userName}</span>
            </StyledPlaylistListItem>
          </Link>
        ))}
      </StyledList>
    </div>
  );
};

export default UserPlaylistsList;

const StyledPlaylistListItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 0.5rem;
  background-color: var(--dark-blue-color);
  position: relative;
  padding: 0.5rem 1rem;
  border: 1px solid var(--pink-color);

  span {
    margin-right: 1rem;
  }

  &:hover {
    cursor: pointer;
    color: var(--pink-color);
  }
`;
