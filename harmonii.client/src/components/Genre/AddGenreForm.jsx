import { useState } from "react";
import { createGenreApi } from "../../api/createGenreApi";
import { displayResponse } from "../../services/displayResponse";

// eslint-disable-next-line react/prop-types
const AddGenreForm = ({ fetchData }) => {
  const [genreName, setGenreName] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (genreName.trim() === "" || genreName.length < 3) {
      alert("Please enter a genre name with at least 3 characters");
      return;
    }

    const response = await createGenreApi(genreName);
    if (!(response.name === "AxiosError")) {
      setGenreName("");
      fetchData();
    }
    displayResponse(response);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Genre Name: </label>
      <input
        type="text"
        value={genreName}
        onChange={(e) => setGenreName(e.target.value)}
        minLength={3}
        maxLength={32}
        required
      />
      <button type="submit">Add Genre</button>
    </form>
  );
};

export default AddGenreForm;
