import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlaylistByUser } from "../../api/fetchPlaylistsByUser";
import { displayResponse } from "../../services/displayResponse";

const UserPlaylistsList = () => {
  const [playlistsList, setPlaylistsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlaylistByUser();
        if (response.name === "AxiosError") {
          console.log(response.response.status);
        } else {
          displayResponse(response);
          setPlaylistsList(() => response.data.data.$values)
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchData();
  }, []);

  return <div>
    Your Playlists
    <ul>
      {
        playlistsList.map((playlist) => <li key={playlist.playlistId}>
          {playlist.playlistName}
            <Link to={`/playlist/${playlist.playlistId}`}>
              Go
            </Link>
          </li>)
      }
    </ul>
  </div>
}

export default UserPlaylistsList;