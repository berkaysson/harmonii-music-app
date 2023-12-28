import { deleteGenreApi } from "../../api/deleteGenreApi";
import { displayResponse } from "../../services/displayResponse";

// eslint-disable-next-line react/prop-types
const DeleteGenreButton = ({ genreId, onDelete }) => {
  const handleDeleteGenreButton = async () => {
    const response = await deleteGenreApi(genreId);
    if (!(response.name === "AxiosError")) {
      onDelete();
    }
    displayResponse(response);
  };

  return <button onClick={handleDeleteGenreButton}>Delete Genre</button>;
};

export default DeleteGenreButton;
