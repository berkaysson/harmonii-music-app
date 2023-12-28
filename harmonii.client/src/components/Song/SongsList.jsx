import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import SongListItem from "./SongListItem";
import { displayResponse } from "../../services/displayResponse";

const SongsList = () => {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllSongs();
      if (!(response.name === "AxiosError")) {
        setSongsList(() => response.data.data.$values);
      }
      displayResponse(response);
    };
    
    fetchData();
  }, []);

  return <div>
    All songs table
    <ul>
      {
        songsList.map((song) => <SongListItem key={song.songId} song={song} />)
      }
    </ul>
  </div>
}

export default SongsList;