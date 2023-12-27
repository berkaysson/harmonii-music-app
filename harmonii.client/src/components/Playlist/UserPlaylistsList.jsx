import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { deletePlaylistApi } from "../../api/deletePlaylistApi";
import { displayResponse } from "../../services/displayResponse";

const UserPlaylistsList = () => {
  const { userPlaylists, fetchUserPlaylists } = usePlaylistContext();

  useEffect(() => {
    fetchUserPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (playlistId) => {
    const response = await deletePlaylistApi(playlistId);
    if (response.name === "AxiosError") {
      console.log(response.response.status);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
      }
    }

    fetchUserPlaylists();
  };

  return (
    <div>
      Your Playlists
      <ul>
        {userPlaylists.map((playlist) => (
          <li key={playlist.playlistId}>
            {playlist.playlistName}
            <Link to={`/playlist/${playlist.playlistId}`}>Go</Link>
            <button onClick={()=>handleDelete(playlist.playlistId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylistsList;
