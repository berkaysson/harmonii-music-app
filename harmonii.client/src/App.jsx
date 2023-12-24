import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import { UserContextProvider } from "./services/hooks/useUser.jsx";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
};

export default App;
