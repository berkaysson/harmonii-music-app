import PlaylistsList from "../components/Playlist/PlaylistsList";
import UserPlaylistsList from "../components/Playlist/UserPlaylistsList";
import SongsList from "../components/Song/SongsList";

const Home = () => {

  return (
    <div>
      <SongsList />
      <PlaylistsList />
      <UserPlaylistsList />
    </div>
  );
};

export default Home;