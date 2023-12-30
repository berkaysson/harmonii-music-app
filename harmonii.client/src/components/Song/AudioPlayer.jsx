import { useEffect } from "react";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";
import styled from "styled-components";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { CiPlay1 } from "react-icons/ci";
import { CiStop1 } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiVolumeHigh } from "react-icons/ci";
import { CiVolumeMute } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";

const AudioPlayer = () => {
  const {
    currentSong,
    audioRef,
    playAudio,
    playNextSong,
    playlistSongs,
    pauseAudio,
  } = useAudioPlayerContext();

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
      <h2>
        {currentSong?.songName} {currentSong?.artistName}
      </h2>
      <H5AudioPlayer
        src={currentSong?.audioFileUrl}
        ref={audioRef}
        customAdditionalControls={[]}
        customIcons={{
          play: <CiPlay1 className="audio-player-icon" />,
          pause: <CiStop1 className="audio-player-icon" />,
          rewind: <CiSquareMinus className="audio-player-icon" />,
          forward: <CiSquarePlus className="audio-player-icon" />,
          volume: <CiVolumeHigh className="audio-player-icon" />,
          volumeMute: <CiVolumeMute className="audio-player-icon" />,
        }}
      />
      <button
        onClick={playNextSong}
        disabled={!currentSong?.audioFileUrl || !playlistSongs}
      >
        <CiSquareChevRight className="audio-player-icon" /> next
      </button>
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;

const StyledAudioPlayer = styled.div`
  border: 1px solid red;
  display: flex;
  button {
    font-size: 32px;
  }

  .audio-player-icon {
    font-size: 32px;
    color: white;
  }

  .rhap_container{
    background-color: var(--dark-blue) !important;
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
