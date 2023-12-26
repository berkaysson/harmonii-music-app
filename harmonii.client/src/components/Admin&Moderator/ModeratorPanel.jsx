import { useEffect, useState } from "react";
import AddSongForm from "../Song/AddSongForm";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import ModeratorSongsList from "../Song/ModeratorSongsList";
import ModeratorGenreList from "../Genre/ModeratorGenreList";
import { fetchAllGenres } from "../../api/fetchAllGenres";

const ModeratorPanel = () => {
  const [songsList, setSongsList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  const fetchSongs = async () => {
    const response = await fetchAllSongs();
    if (response.name === "AxiosError") {
      console.log(response.response.status);
    } else {
      setSongsList(() => response.data.data.$values)
    }
  };

  const fetchGenres = async () => {
    const response = await fetchAllGenres();
    if (response.name === "AxiosError") {
      console.log(response.response.status);
    } else {
      setGenresList(() => response.data.data.$values)
    }
  };
  
  useEffect(()=> {
    fetchSongs();
    fetchGenres();
  }, []);

  return (
    <div>
      Moderator Panel
      <AddSongForm fetchData={fetchSongs} />
      <ModeratorSongsList fetchData={fetchSongs} songsList={songsList} />
      <ModeratorGenreList fetchData={fetchGenres} genresList={genresList} />
    </div>
  );
};

export default ModeratorPanel;
