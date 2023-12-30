import { addSongToPlaylist } from "../../api/addSongToPlaylist";
import { displayResponse } from "../../services/displayResponse";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";
import { StyledListItem } from "../Shared/StyledListItem";
import AddToPlaylistDropdown from "../Playlist/AddToPlaylistDropdown";

/* eslint-disable react/prop-types */
const SongListItem = ({ song }) => {
  const { setCurrentSong, isPlaying, currentSong, pauseAudio, playAudio } =
    useAudioPlayerContext();

  const handleAddToPlaylist = async (selectedPlaylistId) => {
    const response = await addSongToPlaylist(selectedPlaylistId, song.songId);
    displayResponse(response);
  };

  const handlePlayButton = () => {
    if (currentSong?.songId === song.songId) {
      if (isPlaying) pauseAudio();
      else playAudio();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <StyledListItem id={song.songId}>
      <span className="list-cover-img">
        <img src={song?.coverImageUrl} alt="cover" />
      </span>
      <span className="list-play-btn">
        <button onClick={handlePlayButton}>
          {isPlaying && currentSong?.songId === song.songId ? "Stop" : "Play"}
        </button>
      </span>
      <span className="list-song-info">
        <span>{song.songName}</span>
        <span>{song.artistName}/{song.genreName}</span>
      </span>
      <span className="list-add-to-playlist">
        <AddToPlaylistDropdown onAddToPlaylist={handleAddToPlaylist} />
      </span>
    </StyledListItem>
  );
};

export default SongListItem;
