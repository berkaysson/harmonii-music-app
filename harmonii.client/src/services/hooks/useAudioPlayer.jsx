/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePlaylistContext } from "./usePlaylist";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const { playlistSongs } = usePlaylistContext();
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (audioRef.current.audio.current) {
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current.audio.current) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  };

  const playNextSong = () => {
    if (playlistSongs.length > 0) {
      const currentIndex = playlistSongs.findIndex(song => song === currentSong);
      const nextIndex = (currentIndex + 1) % playlistSongs.length;
      setCurrentSong(playlistSongs[nextIndex]);
    }
  };

  useEffect(() => {
    if(playlistSongs.length > 0){
      setCurrentSong(playlistSongs[0]);
    }
    
  }, [playlistSongs]);

  const values = {
    currentSong,
    setCurrentSong,
    playAudio,
    pauseAudio,
    audioRef,
    isPlaying,
    playNextSong,
  };

  return (
    <AudioPlayerContext.Provider value={values}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = () => {
  return useContext(AudioPlayerContext);
};
