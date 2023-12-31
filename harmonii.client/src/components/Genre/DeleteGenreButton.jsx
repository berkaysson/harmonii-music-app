import { deleteGenreApi } from "../../api/deleteGenreApi";
import { displayResponse } from "../../services/displayResponse";
import { RiDeleteBin2Line } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const DeleteGenreButton = ({ genreId, onDelete }) => {
  const handleDeleteGenreButton = async () => {
    const response = await deleteGenreApi(genreId);
    if (!(response.name === "AxiosError")) {
      onDelete();
    }
    displayResponse(response);
  };

  return <button onClick={handleDeleteGenreButton} className="btn"  style={{fontSize: "27px"}}><RiDeleteBin2Line /></button>;
};

export default DeleteGenreButton;
