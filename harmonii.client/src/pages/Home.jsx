import styled from "styled-components";
import PlaylistsList from "../components/Playlist/PlaylistsList";
import UserPlaylistsList from "../components/Playlist/UserPlaylistsList";
import SongsList from "../components/Song/SongsList";

const Home = () => {

  return (
    <StyledHomePage>
      <UserPlaylistsList />
      <SongsList />
      <PlaylistsList />
    </StyledHomePage>
  );
};

export default Home;

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;