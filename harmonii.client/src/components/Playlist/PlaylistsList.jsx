import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import styled from "styled-components";
import { StyledList } from "../Shared/StyledList";

const PlaylistsList = () => {
  const { fetchPlaylists, playlists } = usePlaylistContext();

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>
        All playlists
      </h2>
      <br />
      <StyledList>
        {playlists.map((playlist) => (
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

export default PlaylistsList;

const StyledPlaylistListItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 0.2rem;
  background-color: var(--dark-blue-color);
  position: relative;
  padding: 0.5rem 1rem;

  span {
    margin-right: 1rem;
  }

  &:hover {
    cursor: pointer;
    color: var(--pink-color);
  }
`;
