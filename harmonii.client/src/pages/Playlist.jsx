import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { displayResponse } from "../services/displayResponse";
import { fetchPlaylist } from "../api/fetchPlaylist";
import PlaylistDetails from "../components/Playlist/PlaylistDetails";

const Playlist = () => {
  const [playlistData, setPlaylistData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetchPlaylist(id);
    if (!(response.name === "AxiosError")) {
      setPlaylistData(response.data.data);
    }
    displayResponse(response);
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <PlaylistDetails fetchData={fetchData} playlistData={playlistData} />
    </div>
  );
}

export default Playlist;