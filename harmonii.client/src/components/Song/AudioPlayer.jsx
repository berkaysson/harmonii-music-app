import { useEffect } from "react";
import { useAudioPlayerContext } from "../../services/hooks/useAudioPlayer";

const AudioPlayer = () => {
  const { currentSong, audioRef, playAudio, playNextSong  } = useAudioPlayerContext();

  useEffect(() => {
    const handleEnded = () => {
      playNextSong();
    };

    if (currentSong && audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
      return () => {
        audioRef.current.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSong, audioRef, playNextSong]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.load();
      playAudio();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);
  
  return (
    <div>
      <h2>{currentSong?.songName}-{currentSong?.artistName}</h2>
      <audio controls ref={audioRef}>
        {currentSong?.audioFileUrl && (
          <source src={currentSong?.audioFileUrl} />
        )}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
