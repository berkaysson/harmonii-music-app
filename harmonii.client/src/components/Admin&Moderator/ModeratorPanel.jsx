import { useEffect, useState } from "react";
import AddSongForm from "../Song/AddSongForm";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import ModeratorSongsList from "../Song/ModeratorSongsList";
import ModeratorGenreList from "../Genre/ModeratorGenreList";
import { fetchAllGenres } from "../../api/fetchAllGenres";
import AddGenreForm from "../Genre/AddGenreForm";
import { displayResponse } from "../../services/displayResponse";
import styled from "styled-components";

const ModeratorPanel = () => {
  const [songsList, setSongsList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  const fetchSongs = async () => {
    const response = await fetchAllSongs();
    if (!(response.name === "AxiosError")) {
      setSongsList(() => response.data.data.$values)
    }
    displayResponse(response);
  };

  const fetchGenres = async () => {
    const response = await fetchAllGenres();
    if (!(response.name === "AxiosError")) {
      setGenresList(() => response.data.data.$values);
      await fetchSongs();
    }
    displayResponse(response);
  };
  
  useEffect(()=> {
    fetchSongs();
    fetchGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledModeratorPanel>
      <h2>
        Moderator Panel
      </h2>
     
      <AddSongForm fetchData={fetchSongs} genresList={genresList} />
      <ModeratorSongsList fetchData={fetchSongs} songsList={songsList} genresList={genresList} />
      <br />
      <AddGenreForm fetchData={fetchGenres} />
      <ModeratorGenreList fetchData={fetchGenres} genresList={genresList} />
    </StyledModeratorPanel>
  );
};

export default ModeratorPanel;

const StyledModeratorPanel = styled.div`
  display: flex;
  flex-direction: column;

  & > *{
    margin-bottom: 2rem;
    background-color: var(--dark-blue-color);
    padding: .5rem 2rem;
    border-radius: .5rem;
    
    @media(max-width: 700px){
      padding: .5rem;
      margin-bottom: 1rem;
    }
  }
`;
