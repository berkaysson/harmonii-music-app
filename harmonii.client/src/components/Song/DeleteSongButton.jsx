import { deleteSongApi } from "../../api/deleteSongApi";
import { displayResponse } from "../../services/displayResponse";

// eslint-disable-next-line react/prop-types
const DeleteSongButton = ({ songId, onDelete }) => {
  const handleDeleteSongButton = async () => {
    const response = await deleteSongApi(songId);
    if (!(response.name === "AxiosError")) {
      onDelete();
    }
    displayResponse(response);
  };

  return <button onClick={handleDeleteSongButton}>Delete Song</button>;
};

export default DeleteSongButton;
