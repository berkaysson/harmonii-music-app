import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { displayResponse } from "../services/displayResponse";
import { fetchPlaylist } from "../api/fetchPlaylist";

const Playlist = () => {
  const [playlistData, setPlaylistData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetchPlaylist(id);
    if(response.name === "AxiosError"){
      console.log(response.response.status);
    }
    else{
      if(response.data.status === "Success"){
        setPlaylistData(response.data.data);
        displayResponse(response);
      }
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {playlistData ? (
        <>
          <h2>Playlist Name: {playlistData.playlistName}</h2>
          <h4>Creator: {playlistData.userName}</h4>
          <p>Playlist Description: {playlistData.playlistDescription}</p>
          <h3>Songs:</h3>
          <ul>
            {playlistData.songs.$values.map((song) => (
              <li key={song.songId}>{song.songName}</li>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Playlist;