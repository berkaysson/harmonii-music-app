import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllPlaylists } from "../../api/playlists/fetchAllPlaylists";
import { fetchPlaylistsByUser } from "../../api/users/fetchPlaylistsByUser";
import { displayResponse } from "../displayResponse";
import { useUserContext } from "./useUser";

const PlaylistContext = createContext();

// eslint-disable-next-line react/prop-types
export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const { userValid } = useUserContext();

  const handleFetchAllPlaylists = async () => {
    try {
      const response = await fetchAllPlaylists();
      if (!(response.name === "AxiosError")) {
        setPlaylists(() => response.data.data.$values || response.data.data || []);
      }
      displayResponse(response);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleFetchUsersPlaylists = async () => {
    try {
      const response = await fetchPlaylistsByUser();
      if (!(response.name === "AxiosError")) {
        setUserPlaylists(() => response.data.data.$values || response.data.data || []);
      }
      displayResponse(response);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handlePlaylistSelect = (playlist) => {
    setPlaylistSongs(playlist?.songs?.$values || playlist?.songs || []);
    setCurrentPlaylist(playlist?.playlistId);
  };

  useEffect(() => {
    if (userValid) {
      handleFetchAllPlaylists();
      handleFetchUsersPlaylists();
    }
  }, [userValid]);

  const values = {
    playlists,
    userPlaylists,
    fetchPlaylists: handleFetchAllPlaylists,
    fetchUserPlaylists: handleFetchUsersPlaylists,
    playlistSongs,
    setPlaylistSongs,
    handlePlaylistSelect,
    currentPlaylist,
  };

  return (
    <PlaylistContext.Provider value={values}>
      {children}
    </PlaylistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};
