import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import SongListItem from "./SongListItem";
import { displayResponse } from "../../services/displayResponse";
import { StyledList } from "../Shared/StyledList";

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
    <h2>All songs</h2><br />
    <StyledList>
      {
        songsList.map((song) => <SongListItem key={song.songId} song={song} />)
      }
    </StyledList>
  </div>
}

export default SongsList;
