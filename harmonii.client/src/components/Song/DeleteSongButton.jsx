import { deleteSongApi } from "../../api/deleteSongApi";
import { displayResponse } from "../../services/displayResponse";
import { RiDeleteBin2Line } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const DeleteSongButton = ({ songId, onDelete }) => {
  const handleDeleteSongButton = async () => {
    const response = await deleteSongApi(songId);
    if (!(response.name === "AxiosError")) {
      onDelete();
    }
    displayResponse(response);
  };

  return <button className="btn" style={{fontSize: "27px"}} onClick={handleDeleteSongButton}><RiDeleteBin2Line /></button>;
};

export default DeleteSongButton;
