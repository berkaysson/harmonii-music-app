import { useState } from "react";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { addSongToPlaylist } from "../../api/addSongToPlaylist";
import { displayResponse } from "../../services/displayResponse";

/* eslint-disable react/prop-types */
const SongListItem = ({ song }) => {
  const { userPlaylists } = usePlaylistContext();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

  const handlePlaylistChange = (event) => {
    setSelectedPlaylistId(event.target.value);
  };

  const handleAddToPlaylist = async (event) => {
    event.preventDefault();
    const response = await addSongToPlaylist(
      selectedPlaylistId,
      song.songId
    );
    if (response.name === "AxiosError") {
      console.log(response);
      console.log(response.response.status);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
      }
    }
  };

  return (
    <li id={song.songId}>
      <span>{song.songName}</span>-<span>{song.artistName}</span>-
      <span>{song.genreName}</span>-<span>{song.userName}</span>
      <span>
        <select value={selectedPlaylistId} onChange={handlePlaylistChange}>
          <option value="">Select Playlist</option>
          {userPlaylists.map((playlist) => (
            <option key={playlist.playlistId} value={playlist.playlistId}>
              {playlist.playlistName}
            </option>
          ))}
        </select>
        <button onClick={handleAddToPlaylist} disabled={!selectedPlaylistId}>
          Add to Playlist
        </button>
      </span>
    </li>
  );
};

export default SongListItem;
