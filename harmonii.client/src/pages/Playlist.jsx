import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { displayResponse } from "../services/displayResponse";
import { fetchPlaylist } from "../api/fetchPlaylist";
import PlaylistDetails from "../components/Playlist/PlaylistDetails";
import { motion } from "framer-motion";

const Playlist = () => {
  const [playlistData, setPlaylistData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetchPlaylist(id);
    if (!(response.name === "AxiosError")) {
      setPlaylistData(response.data.data);
    }
    displayResponse(response);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <motion.div
      className="main__container"
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <PlaylistDetails fetchData={fetchData} playlistData={playlistData} />
    </motion.div>
  );
};

export default Playlist;
