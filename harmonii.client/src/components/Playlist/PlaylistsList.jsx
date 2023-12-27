import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";

const PlaylistsList = () => {
  const { fetchPlaylists, playlists } = usePlaylistContext();

  useEffect(()=>{
    fetchPlaylists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return <div>
    All playlists table
    <ul>
      {
        playlists.map((playlist) => <li key={playlist.playlistId}>
          {playlist.playlistName}
            <Link to={`/playlist/${playlist.playlistId}`}>
              Go
            </Link>
          </li>)
      }
    </ul>
  </div>
}

export default PlaylistsList;