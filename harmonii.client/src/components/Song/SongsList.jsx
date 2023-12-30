import { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import SongListItem from "./SongListItem";
import { displayResponse } from "../../services/displayResponse";
import styled from "styled-components";

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
    <StyledList>
      {
        songsList.map((song) => <SongListItem key={song.songId} song={song} />)
      }
    </StyledList>
  </div>
}

export default SongsList;

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .2rem;
`;