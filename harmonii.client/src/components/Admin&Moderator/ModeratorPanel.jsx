import { useEffect, useState } from "react";
import AddSongForm from "../Song/AddSongForm";
import { fetchAllSongs } from "../../api/fetchAllSongs";
import ModeratorSongsList from "../Song/ModeratorSongsList";

const ModeratorPanel = () => {
  const [songsList, setSongsList] = useState([]);

  const fetchData = async () => {
    const response = await fetchAllSongs();
    if (response.name === "AxiosError") {
      console.log(response.response.status);
    } else {
      setSongsList(() => response.data.data.$values)
    }
  };
  
  useEffect(()=> {
    fetchData();
  }, []);

  return (
    <div>
      Moderator Panel
      <AddSongForm fetchData={fetchData} />
      <ModeratorSongsList fetchData={fetchData} songsList={songsList} />
    </div>
  );
};

export default ModeratorPanel;
