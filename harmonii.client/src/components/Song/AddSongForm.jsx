import { createSongApi } from "../../api/createSongApi";
import { songSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import FormikForm from "../Shared/FormikForm";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase/firebase";

// eslint-disable-next-line react/prop-types
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
  
            if (response.name === "AxiosError") {
              console.log(response);
            } else {
              if (response.data.status === "Success") {
                displayResponse(response);
                fetchData();
              }
            }
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
    <div>
      <FormikForm
        initialValues={initialValues}
        validationSchema={songSchema}
        onSubmit={handleUpload}
        fields={fields}
        buttonText="Add Song"
      >
        <div>
          <label htmlFor="">Cover Image Url</label>
          <input type="text" value={coverImageUrl} onChange={(event)=>setCoverImageUrl(event.target.value)} />
          <img src={coverImageUrl} style={{width:"100px", height:"auto"}} />
        </div>
        
        <input type="file" onChange={handleAudioFileChange} />
        {progressPercent !== 0 && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progressPercent}%` }}>
            {progressPercent === 100 ? "Completed" : progressPercent + "%"}
          </div>
        </div>
      )}
      </FormikForm>
    </div>
  );
};

export default AddSongForm;
