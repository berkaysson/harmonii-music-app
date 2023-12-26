import { createSongApi } from "../../api/createSongApi";
import { songSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import FormikForm from "../Shared/FormikForm";

const AddSongForm = () => {
  const initialValues = {
    SongName: '',
    Artist: '',
    CoverImageUrl: '',
    AudioFileUrl: '',
    GenreName: '',
  };

  const handleSubmit = async (values) => {
    const response = await createSongApi(values);
    if (response.name === "AxiosError") {
      console.log(response);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
      }
    }
  };

  const fields = [
    { id: 'SongName', label: 'Song Name', type: 'text' },
    { id: 'Artist', label: 'Artist', type: 'text' },
    { id: 'CoverImageUrl', label: 'Cover Image URL', type: 'text' },
    { id: 'AudioFileUrl', label: 'Audio File URL', type: 'text' },
    { id: 'GenreName', label: 'Genre Name', type: 'text' },
  ];

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={songSchema}
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Add Song"
    />
  );
};

export default AddSongForm;
