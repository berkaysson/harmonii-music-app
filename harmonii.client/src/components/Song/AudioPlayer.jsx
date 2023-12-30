import { useEffect } from "react";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";
import styled from "styled-components";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { RiPlayMiniLine } from "react-icons/ri";
import { RiPauseFill } from "react-icons/ri";
import { RiReplay5Line } from "react-icons/ri";
import { RiForward5Line } from "react-icons/ri";
import { RiVolumeUpLine } from "react-icons/ri";
import { RiVolumeMuteLine } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";

const AudioPlayer = () => {
  const {
    currentSong,
    audioRef,
    playAudio,
    playNextSong,
    pauseAudio,
  } = useAudioPlayerContext();

  const { playlistSongs } = usePlaylistContext();

  useEffect(() => {
    const handleEnded = () => {
      playNextSong();
    };

    if (currentSong && audioRef.current.audio.current) {
      audioRef.current.audio.current.addEventListener("ended", handleEnded);
      audioRef.current.audio.current.addEventListener("pause", pauseAudio);
      audioRef.current.audio.current.addEventListener("play", playAudio);
      return () => {
        audioRef.current.audio.current.removeEventListener(
          "ended",
          handleEnded
        );
        audioRef.current.audio.current.removeEventListener("pause", pauseAudio);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.audio.current.addEventListener("play", playAudio);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.audio.current.load();
      playAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  return (
    <StyledAudioPlayer>
      <div id="audio-player-cover">
        <img src={currentSong?.coverImageUrl} alt="coverImage" />
      </div>
      <H5AudioPlayer
        src={currentSong?.audioFileUrl}
        ref={audioRef}
        customAdditionalControls={[]}
        customIcons={{
          play: <RiPlayMiniLine className="audio-player-icon" />,
          pause: <RiPauseFill className="audio-player-icon" />,
          rewind: <RiReplay5Line className="audio-player-icon" />,
          forward: <RiForward5Line className="audio-player-icon" />,
          volume: <RiVolumeUpLine className="audio-player-icon" />,
          volumeMute: <RiVolumeMuteLine className="audio-player-icon" />,
        }}
        header={currentSong?.songName}
      />
      <button
        onClick={playNextSong}
        disabled={!currentSong?.audioFileUrl || !playlistSongs}
      >
        <RiArrowRightLine className="audio-player-icon" />
      </button>
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;

const StyledAudioPlayer = styled.div`
  display: flex;
  button {
    width: 100px;
    display: flex;
    align-items:center;
    justify-content: center;

    &:hover{
      cursor: pointer;
    }
  }

  #audio-player-cover{
    width: 140px;
  }

  .audio-player-icon {
    font-size: 32px;
    color: white;
  }

  .rhap_container{
    background-color: var(--dark-blue) !important;
    box-shadow: none;
  }

  .rhap_time{
    color: white !important;
  }

  .rhap_progress-indicator{
    background-color: var(--pink-color);
  }

  .rhap_volume-indicator{
    background-color: var(--pink-color);
  }

  .rhap_progress-filled{
    background-color: var(--turq-color-3);
  }

  .rhap_volume-button{
    margin-right: 1rem;
    height: 32px;
  }
`;
