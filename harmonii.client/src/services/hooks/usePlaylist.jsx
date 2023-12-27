import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllPlaylists } from "../../api/fetchAllPlaylists";
import { fetchPlaylistsByUser } from "../../api/fetchPlaylistsByUser";
import { displayResponse } from "../displayResponse";

const PlaylistContext = createContext();

// eslint-disable-next-line react/prop-types
export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  
  const handleFetchAllPlaylists = async () => {
    try {
      const response = await fetchAllPlaylists();
      if (response.name === "AxiosError") {
        console.log(response.response.status);
      } else {
        setPlaylists(() => response.data.data.$values);
        displayResponse(response);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleFetchUsersPlaylists = async () => {
    try {
      const response = await fetchPlaylistsByUser();
      if (response.name === "AxiosError") {
        console.log(response.response.status);
      } else {
        setUserPlaylists(() => response.data.data.$values)
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(()=>{
    handleFetchAllPlaylists();
    handleFetchUsersPlaylists();
  }, []);

  const values = {
    playlists,
    userPlaylists,
    fetchPlaylists: handleFetchAllPlaylists,
    fetchUserPlaylists: handleFetchUsersPlaylists
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