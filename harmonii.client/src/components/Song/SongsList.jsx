import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import SongListItem from "./SongListItem";

const SongsList = () => {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllSongs();
      if (response.name === "AxiosError") {
        console.log(response.response.status);
      } else {
        setSongsList(() => response.data.data.$values)
      }
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