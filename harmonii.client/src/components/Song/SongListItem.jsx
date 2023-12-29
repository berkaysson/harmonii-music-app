import { useState } from "react";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { addSongToPlaylist } from "../../api/addSongToPlaylist";
import { displayResponse } from "../../services/displayResponse";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";

/* eslint-disable react/prop-types */
const SongListItem = ({ song }) => {
  const { userPlaylists } = usePlaylistContext();
  const { setCurrentSong, isPlaying, currentSong, pauseAudio, playAudio } = useAudioPlayerContext();
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
    displayResponse(response);
  };

  const handlePlayButton = () => {
    if(currentSong?.songId === song.songId){
      if(isPlaying) pauseAudio();
      else playAudio();
    }
    else{
      setCurrentSong(song);
    }
  }

  return (
    <li id={song.songId}>
      <span>
        <img src={song?.coverImageUrl} alt="cover" />
      </span>
      <span>
        <button onClick={handlePlayButton}>{isPlaying && currentSong?.songId === song.songId ? "Stop" : "Play"}</button>
      </span>
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
