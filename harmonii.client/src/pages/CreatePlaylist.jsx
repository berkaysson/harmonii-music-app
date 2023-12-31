import { motion } from "framer-motion";
import AddPlaylistForm from "../components/Playlist/AddPlaylistForm";

const CreatePlaylist = () => {

  return (
    <motion.div
    className="main__container"
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: .2 }}
    >
      <AddPlaylistForm />
    </motion.div>
  );
};

export default CreatePlaylist;