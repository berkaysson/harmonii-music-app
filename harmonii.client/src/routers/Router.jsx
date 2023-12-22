import { Route, useLocation, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import CreatePlaylist from "../pages/CreatePlaylist";
import NotFound from "../pages/404";
import ProtectedRoute from "./ProtectedRoute";

const RouterComponent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route exact path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/settings" element={<ProtectedRoute />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/create-playlist" element={<ProtectedRoute />}>
        <Route path="/create-playlist" element={<CreatePlaylist />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;
