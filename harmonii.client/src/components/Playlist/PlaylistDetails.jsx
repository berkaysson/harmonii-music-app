import { removeSongFromPlaylist } from "../../api/removeSongFromPlaylist";
import { displayResponse } from "../../services/displayResponse";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { useUserContext } from "../../services/hooks/useUser";
import SongListItem from "../Song/SongListItem";

/* eslint-disable react/prop-types */
const PlaylistDetails = ({ playlistData, fetchData }) => {
  const { user } = useUserContext();
  const { setPlaylistSongs } = usePlaylistContext();

  const handleRemoveFromPlaylist = async (songId) => {
    const response = await removeSongFromPlaylist(
      playlistData.playlistId,
      songId
    );
    if (!(response.name === "AxiosError")) {
      fetchData();
    }
    displayResponse(response);
  };

  const handlePlaylistPlay = () => {
    setPlaylistSongs(playlistData.songs.$values);
  }

  return (
    <div>
      {playlistData ? (
        <>
          <button onClick={handlePlaylistPlay}>Play</button>
          <h2>Playlist Name: {playlistData.playlistName}</h2>
          <h4>Creator: {playlistData.userName}</h4>
          <p>Playlist Description: {playlistData.playlistDescription}</p>
          <h3>Songs:</h3>
          <ul>
            {playlistData.songs.$values.map((song) => (
              <div key={song.songId} style={{display: "flex", gap: "10px"}}>
                <SongListItem song={song} />
                {user.userName === playlistData.userName ? (
                  <button onClick={() => handleRemoveFromPlaylist(song.songId)}>
                    Remove
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
