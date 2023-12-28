import { useState } from "react";
import { displayResponse } from "../../services/displayResponse";
import { updateUserImage } from "../../api/updateUserImage";

// eslint-disable-next-line react/prop-types
const UploadProfileImage = ({ fetchData }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserImage(imageUrl);
    if (!(response.name === "AxiosError")) {
      fetchData();
    }
    displayResponse(response);
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={handleInputChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadProfileImage;
