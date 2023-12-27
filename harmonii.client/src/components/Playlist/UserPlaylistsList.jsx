import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";

const UserPlaylistsList = () => {
  const { userPlaylists, fetchUserPlaylists } = usePlaylistContext();

  useEffect(() => {
    fetchUserPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Your Playlists
      <ul>
        {userPlaylists.map((playlist) => (
          <li key={playlist.playlistId}>
            {playlist.playlistName}
            <Link to={`/playlist/${playlist.playlistId}`}>Go</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylistsList;
