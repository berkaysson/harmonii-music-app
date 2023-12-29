import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import { UserContextProvider } from "./services/hooks/useUser.jsx";
import { PlaylistProvider } from "./services/hooks/usePlaylist.jsx";
import { AudioPlayerProvider } from "./services/hooks/useAudioPlayer.jsx";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <PlaylistProvider>
          <AudioPlayerProvider>
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </AudioPlayerProvider>
        </PlaylistProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
