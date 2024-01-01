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
      <div>
        <span>Song Id: {song.songId}</span>
        <span>
          {song.songName}\{song.artistName}
        </span>
        <span>Uploaded by: {song.userName}</span>
        <span className="moderator-songs-list-delete-btn">
          <DeleteSongButton songId={song.songId} onDelete={fetchData} />
        </span>
      </div>

      <span className="update-genre-dropdown">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genresList.map((genre) => (
            <option key={genre.genreId} value={genre.genreName}>
              {genre.genreName}
            </option>
          ))}
        </select>
        <button
          className="btn"
          disabled={!selectedGenre}
          onClick={handleUpdateGenre}
        >
          Update Genre
        </button>
      </span>
    </StyledModeratorSongsListItem>
  );
};

export default ModeratorSongsListItem;

const StyledModeratorSongsListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-radius: 0.2rem;
  border: 1px solid var(--turq-color-2);
  background-color: var(--dark-blue-color);
  position: relative;
  padding: 0.5rem;
  margin-bottom: 0.4rem;
  gap: 0.6rem;

  span {
    padding: 0 0.5rem;
    display: flex;
  }

  .update-genre-dropdown {
    display: flex;
    gap: 1rem;
  }

  .moderator-songs-list-delete-btn{
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;
