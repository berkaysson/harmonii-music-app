/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteSongButton from "./DeleteSongButton";
import { updateSongGenre } from "../../api/updateSongGenre";
import { displayResponse } from "../../services/displayResponse";
import styled from "styled-components";

const ModeratorSongsListItem = ({ song, fetchData, genresList }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleUpdateGenre = async () => {
    const response = await updateSongGenre(song.songId, selectedGenre);
    displayResponse(response);
    setSelectedGenre("");
  };

  return (
    <StyledModeratorSongsListItem key={song.songId}>
      <span>Song Id: {song.songId}</span>
      <span style={{width: "50%"}}>
        {song.songName}\{song.artistName} - Uploaded by: {song.userName}
      </span>
      <span>
        <DeleteSongButton songId={song.songId} onDelete={fetchData} />
      </span>
      <span className="update-genre-dropdown">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genresList.map((genre) => (
            <option key={genre.genreId} value={genre.genreName}>
              {genre.genreName}
            </option>
          ))}
        </select>
        <button className="btn" disabled={!selectedGenre} onClick={handleUpdateGenre}>
          Update Genre
        </button>
      </span>
    </StyledModeratorSongsListItem>
  );
};

export default ModeratorSongsListItem;

const StyledModeratorSongsListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 0.2rem;
  border: 1px solid var(--turq-color-2);
  background-color: var(--dark-blue-color);
  position: relative;
  padding: .2rem;
  margin-bottom: .4rem;

  span {
    margin-left: 0.5rem;
    padding: 0 0.5rem;
    min-width: 50px;
    display: flex;
    align-items: center;
  }

  .update-genre-dropdown{
    display: flex;
    gap: 1rem;
    position: absolute;
    right: 1rem;
  }
`;
