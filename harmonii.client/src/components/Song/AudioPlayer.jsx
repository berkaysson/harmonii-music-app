import { useEffect } from "react";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";
import styled from "styled-components";

const AudioPlayer = () => {
  const { currentSong, audioRef, playAudio, playNextSong, playlistSongs, pauseAudio } = useAudioPlayerContext();

  useEffect(() => {
    const handleEnded = () => {
      playNextSong();
    };

    if (currentSong && audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
      audioRef.current.addEventListener("pause", pauseAudio);
      audioRef.current.addEventListener("play", playAudio);
      return () => {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("pause", pauseAudio);
        audioRef.current.addEventListener("play", playAudio);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.load();
      playAudio();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);
  
  return (
    <StyledAudioPlayer>
      <h2>{currentSong?.songName} {currentSong?.artistName}</h2>
      <audio controls ref={audioRef}>
        {currentSong?.audioFileUrl && (
          <source src={currentSong?.audioFileUrl} />
        )}
        Your browser does not support the audio element.
      </audio>
      <button onClick={playNextSong} disabled={!currentSong?.audioFileUrl || !playlistSongs}>Next</button>
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;

const StyledAudioPlayer = styled.div`
  border: 1px solid red;
`;