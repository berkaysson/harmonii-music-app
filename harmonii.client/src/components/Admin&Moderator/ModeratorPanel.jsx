import { useEffect, useState } from "react";
import AddSongForm from "../Song/AddSongForm";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import ModeratorSongsList from "../Song/ModeratorSongsList";
import ModeratorGenreList from "../Genre/ModeratorGenreList";
import { fetchAllGenres } from "../../api/fetchAllGenres";
import AddGenreForm from "../Genre/AddGenreForm";

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
      setGenresList(() => response.data.data.$values);
      await fetchSongs();
    }
  };
  
  useEffect(()=> {
    fetchSongs();
    fetchGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Moderator Panel
      <AddSongForm fetchData={fetchSongs} genresList={genresList} />
      <ModeratorSongsList fetchData={fetchSongs} songsList={songsList} genresList={genresList} />
      <AddGenreForm fetchData={fetchGenres} />
      <ModeratorGenreList fetchData={fetchGenres} genresList={genresList} />
    </div>
  );
};

export default ModeratorPanel;
