import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import { UserContextProvider } from "./services/hooks/useUser.jsx";
import { PlaylistProvider } from "./services/hooks/usePlaylist.jsx";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <PlaylistProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </PlaylistProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
