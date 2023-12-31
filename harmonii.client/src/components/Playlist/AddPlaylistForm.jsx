import { createPlaylistApi } from "../../api/createPlaylistApi";
import { playlistSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import FormikForm from "../Shared/FormikForm";

const AddPlaylistForm = () => {
  const { fetchPlaylists, fetchUserPlaylists } = usePlaylistContext();

  const initialValues = {
    PlaylistName: "",
    PlaylistDescription: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const response = await createPlaylistApi(values);
    if (!(response.name === "AxiosError")) {
      fetchPlaylists();
      fetchUserPlaylists();
      resetForm();
    }
    displayResponse(response);
  };

  const fields = [
    { id: "PlaylistName", label: "Playlist Name", type: "text" },
    { id: "PlaylistDescription", label: "Playlist Description", type: "text" },
  ];

  return (
    <div>
      <h2>Create New Playlist</h2>
      <FormikForm
        initialValues={initialValues}
        validationSchema={playlistSchema}
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Create Playlist"
      />
    </div>
  );
};

export default AddPlaylistForm;
