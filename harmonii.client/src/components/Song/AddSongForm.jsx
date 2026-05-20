/* eslint-disable react/prop-types */
import { createSongApi } from "../../api/songs/createSongApi";
import { songSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import FormikForm from "../Shared/FormikForm";
import { useState } from "react";
import { storageService } from "../../services/storage/storageService";

const AddSongForm = ({ fetchData, genresList }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    SongName: "",
    Artist: "",
    GenreName: "",
  };

  const handleUpload = async (values, { resetForm }) => {
    try {
      if (!audioFile) {
        alert("Please select an audio file first.");
        return;
      }
      setProgressPercent(5); // starting

      // 1. Upload file to MinIO via presigned URL — progress tracked 0–80%
      const fileKey = await storageService.uploadFile(audioFile, 'songs', (pct) => {
        setProgressPercent(pct);
      });
      setProgressPercent(90); // upload done, API call starting

      // 2. Persist song metadata via the backend API
      values = { ...values, CoverImageUrl: coverImageUrl, AudioFileKey: fileKey };
      
      const response = await createSongApi(values);

      if (!(response.name === "AxiosError")) {
        fetchData();
        resetForm();
        setAudioFile(null);
        setCoverImageUrl('');
        setErrorMessage("");
        setProgressPercent(100);
      }
      else if(response.response && response.response.status === 400){
        setErrorMessage(response.response.data.statusMessage);
        setProgressPercent(0);
      }
      displayResponse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Yükleme sırasında bir hata oluştu.");
      setProgressPercent(0);
    }
  };

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    if (!checkAudioFile(file)) {
      event.target.value = null;
      setAudioFile(null);
    } else {
      setAudioFile(file);
    }
  };
  
  const checkAudioFile = (file) => {
    if (!file || !file.type.startsWith("audio/")){
      alert("Please select an audio file (MP3, WAV, etc.)");
      return false;
    }
    const maxSizeInBytes = 20485760; //20MB

    if (file.size > maxSizeInBytes) {
      alert("Selected file is too large. Maximum allowed size is 10MB.");
      return false;
    }
    return true;
  }

  const genreOptions = genresList.map((genre) => ({
    label: genre.genreName,
    value: genre.genreName,
  }));

  const fields = [
    { id: "SongName", label: "Song Name", type: "text" },
    { id: "Artist", label: "Artist", type: "text" },
    {
      id: "GenreName",
      label: "Genre Name",
      type: "select",
      options: genreOptions,
    }
  ];

  return (
    <div>
      <h3>Add Song</h3>
      <FormikForm
        initialValues={initialValues}
        validationSchema={songSchema}
        onSubmit={handleUpload}
        fields={fields}
        buttonText="Add Song"
      >
        <div>
          <label htmlFor="">Cover Image Url
          <input type="text" value={coverImageUrl} onChange={(event)=>setCoverImageUrl(event.target.value)} /></label>
          <img src={coverImageUrl} style={{width:"100px", height:"auto"}} />
        </div>
        <label> Upload a Song File
        <input style={{width: "80%"}} type="file" onChange={handleAudioFileChange} /></label>
        {progressPercent !== 0 && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progressPercent}%` }}>
            {progressPercent === 100 ? "Completed" : progressPercent + "%"}
          </div>
        </div>
      )}
      </FormikForm>
      <span className="error-span">{errorMessage}</span>
    </div>
  );
};

export default AddSongForm;
