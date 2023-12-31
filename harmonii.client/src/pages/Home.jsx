import styled from "styled-components";
import PlaylistsList from "../components/Playlist/PlaylistsList";
import UserPlaylistsList from "../components/Playlist/UserPlaylistsList";
import SongsList from "../components/Song/SongsList";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <StyledHomePage
      className="main__container"
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <UserPlaylistsList />
      <SongsList />
      <PlaylistsList />
    </StyledHomePage>
  );
};

export default Home;

const StyledHomePage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
