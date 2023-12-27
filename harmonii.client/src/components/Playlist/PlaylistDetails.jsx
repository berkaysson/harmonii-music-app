import { removeSongFromPlaylist } from "../../api/removeSongFromPlaylist";
import { displayResponse } from "../../services/displayResponse";
import { useUserContext } from "../../services/hooks/useUser";
import SongListItem from "../Song/SongListItem";

/* eslint-disable react/prop-types */
const PlaylistDetails = ({ playlistData, fetchData }) => {
  const { user } = useUserContext();

  const handleRemoveFromPlaylist = async (songId) => {
    const response = await removeSongFromPlaylist(
      playlistData.playlistId,
      songId
    );
    if (response.name === "AxiosError") {
      console.log(response);
      console.log(response.response.status);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
        fetchData();
      }
    }
  };

  return (
    <div>
      {playlistData ? (
        <>
          <h2>Playlist Name: {playlistData.playlistName}</h2>
          <h4>Creator: {playlistData.userName}</h4>
          <p>Playlist Description: {playlistData.playlistDescription}</p>
          <h3>Songs:</h3>
          <ul>
            {playlistData.songs.$values.map((song) => (
              <div key={song.songId}>
                <SongListItem song={song} />
                {user.userName === playlistData.userName ? (
                  <button onClick={() => handleRemoveFromPlaylist(song.songId)}>
                    Remove from playlist
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PlaylistDetails;
