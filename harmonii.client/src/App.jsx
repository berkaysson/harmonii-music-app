import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import { UserContextProvider } from "./services/hooks/useUser.jsx";
import { PlaylistProvider } from "./services/hooks/usePlaylist.jsx";
import { AudioPlayerProvider } from "./services/hooks/useAudioPlayer.jsx";
import styled from "styled-components";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledApp>
      <UserContextProvider>
        <PlaylistProvider>
          <AudioPlayerProvider>
            {isLoading ? (
              <div style={{height: "100%"}}>Loading...</div>
            ) : (
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            )}
          </AudioPlayerProvider>
        </PlaylistProvider>
      </UserContextProvider>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  height: 100%;
`;
