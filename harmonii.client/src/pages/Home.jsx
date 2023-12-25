import PlaylistsList from "../components/Playlist/PlaylistsList";
import SongsList from "../components/Song/SongsList";

const Home = () => {

  return (
    <div>
      Home
      <SongsList />
      <PlaylistsList />
    </div>
  );
};

export default Home;