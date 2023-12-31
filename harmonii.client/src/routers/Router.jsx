import { Route, useLocation, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreatePlaylist from "../pages/CreatePlaylist";
import NotFound from "../pages/404";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../pages/AdminPanel";
import Playlist from "../pages/Playlist";
import styled from "styled-components";
import ModeratorPanel from "../pages/ModeratorPanel";
import { AnimatePresence } from "framer-motion";

const RouterComponent = () => {
  const location = useLocation();

  return (
    <StyledRoutesWrapper>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/playlist/:id" element={<ProtectedRoute />}>
            <Route path="/playlist/:id" element={<Playlist />} />
          </Route>
          <Route path="/create-playlist" element={<ProtectedRoute />}>
            <Route path="/create-playlist" element={<CreatePlaylist />} />
          </Route>
          <Route path="/admin-panel" element={<ProtectedRoute />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>
          <Route path="/moderator-panel" element={<ProtectedRoute />}>
            <Route path="/moderator-panel" element={<ModeratorPanel />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </StyledRoutesWrapper>
  );
};

export default RouterComponent;

const StyledRoutesWrapper = styled.main`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-left: 240px;
  padding-bottom: 140px;
  height: 100%;
`;
