import { useEffect, useState } from "react";
import { fetchAllPlaylists } from "../../api/fetchAllPlaylists";

const PlaylistsList = () => {
  const [playlistsList, setPlaylistsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllPlaylists();
        if (response.name === "AxiosError") {
          console.log(response.response.status);
        } else {
          setPlaylistsList(() => response.data.data.$values)
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchData();
  }, []);

  return <div>
    All playlists table
    <ul>
      {
        playlistsList.map((playlist) => <li key={playlist.playlistId}>{playlist.playlistName}</li>)
      }
    </ul>
  </div>
}

export default PlaylistsList;