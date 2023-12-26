import { deleteGenreApi } from "../../api/deleteGenreApi";
import { displayResponse } from "../../services/displayResponse";

// eslint-disable-next-line react/prop-types
const DeleteGenreButton = ({ genreId, onDelete }) => {
  const handleDeleteGenreButton = async () => {
    const response = await deleteGenreApi(genreId);
    if (response.name === "AxiosError") {
      console.log(response.response.status);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
        onDelete();
      }
    }
  };

  return <button onClick={handleDeleteGenreButton}>Delete Genre</button>;
};

export default DeleteGenreButton;
