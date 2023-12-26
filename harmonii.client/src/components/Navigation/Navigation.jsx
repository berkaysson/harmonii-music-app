import { Link } from "react-router-dom";
import { useUserContext } from "../../services/hooks/useUser";
import LogoutButton from "../Auth/LogoutButton";

const Navigation = () => {
  const {userValid} = useUserContext();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/create-playlist">Create Playlist</Link>
        </li>
        <li>
          {userValid ? <LogoutButton/> : ""}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
