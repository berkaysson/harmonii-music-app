import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import { UserContextProvider } from "./services/hooks/useUser.jsx";
import { PlaylistProvider } from "./services/hooks/usePlaylist.jsx";
import { AudioPlayerProvider } from "./services/hooks/useAudioPlayer.jsx";
import styled from "styled-components";

const App = () => {
  return (
    <StyledApp>
      <UserContextProvider>
        <PlaylistProvider>
          <AudioPlayerProvider>
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </AudioPlayerProvider>
        </PlaylistProvider>
      </UserContextProvider>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  background-color: var(--dark-blue-color);
  color: white;
`;