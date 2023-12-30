import { useEffect } from "react";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";
import styled from "styled-components";
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayer = () => {
  const { currentSong, audioRef, playAudio, playNextSong, playlistSongs, pauseAudio } = useAudioPlayerContext();

  useEffect(() => {
    const handleEnded = () => {
      playNextSong();
    };

    if (currentSong && audioRef.current.audio.current) {
      audioRef.current.audio.current.addEventListener("ended", handleEnded);
      audioRef.current.audio.current.addEventListener("pause", pauseAudio);
      audioRef.current.audio.current.addEventListener("play", playAudio);
      return () => {
        audioRef.current.audio.current.removeEventListener("ended", handleEnded);
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
      <h2>{currentSong?.songName} {currentSong?.artistName}</h2>
      <H5AudioPlayer
        src={currentSong?.audioFileUrl}
        ref={audioRef}
      />
      <button onClick={playNextSong} disabled={!currentSong?.audioFileUrl || !playlistSongs}>Next</button>
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;

const StyledAudioPlayer = styled.div`
  border: 1px solid red;
  display: flex;
`;