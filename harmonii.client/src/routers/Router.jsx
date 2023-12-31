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

const RouterComponent = () => {
  const location = useLocation();

  return (
    <StyledRoutesWrapper>
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledRoutesWrapper>
  );
};

export default RouterComponent;

const StyledRoutesWrapper = styled.main`
  margin: 1rem;
  padding: 1rem;
  border-radius: .5rem;
  background-color: var(--turq-color-1);
`;