import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/fetchAllSongs";

const SongsList = () => {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllSongs();
        if (response.name === "AxiosError") {
          console.log(response.response.status);
        } else {
          setSongsList(() => response.data.data.$values)
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchData();
  }, []);

  return <div>
    All songs table
    <ul>
      {
        songsList.map((song) => <li key={song.songId}>{song.songName}</li>)
      }
    </ul>
  </div>
}

export default SongsList;