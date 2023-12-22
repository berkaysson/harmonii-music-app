import { Route, useLocation, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import CreatePlaylist from "./pages/CreatePlaylist";
import NotFound from "./pages/404";

const RouterComponent = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-playlist" element={<CreatePlaylist />} />

      <Route element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;
