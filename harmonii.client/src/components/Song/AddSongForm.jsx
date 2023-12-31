/* eslint-disable react/prop-types */
import { createSongApi } from "../../api/createSongApi";
import { songSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import FormikForm from "../Shared/FormikForm";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase/firebase";
import styled from "styled-components";

const AddSongForm = ({ fetchData, genresList }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const initialValues = {
    SongName: "",
    Artist: "",
    GenreName: "",
  };

  const handleUpload = (values) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `songs/${audioFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audioFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressPercent(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            values = { ...values, AudioFileUrl: downloadURL };
            const response = await createSongApi(values);

            if (!(response.name === "AxiosError")) {
              fetchData();
            }
            displayResponse(response);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
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
    <StyledAddSongForm>
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
        <input type="file" onChange={handleAudioFileChange} /></label>
        {progressPercent !== 0 && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progressPercent}%` }}>
            {progressPercent === 100 ? "Completed" : progressPercent + "%"}
          </div>
        </div>
      )}
      </FormikForm>
    </StyledAddSongForm>
  );
};

export default AddSongForm;

const StyledAddSongForm = styled.div`
  
`;