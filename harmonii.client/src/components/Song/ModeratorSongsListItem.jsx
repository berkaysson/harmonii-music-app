/* eslint-disable react/prop-types */
import { useState } from 'react';
import DeleteSongButton from './DeleteSongButton';
import { updateSongGenre } from '../../api/updateSongGenre';
import { displayResponse } from '../../services/displayResponse';

const ModeratorSongsListItem = ({ song, fetchData, genresList }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleUpdateGenre = async () => {
    const response = await updateSongGenre(
      song.songId,
      selectedGenre
    );
    displayResponse(response);
  };

  return (
    <li key={song.songId}>
      {song.songName}
      <span>
        <DeleteSongButton songId={song.songId} onDelete={fetchData} />
      </span>
      <span>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">Select Genre</option>
          {genresList.map((genre) => (
            <option key={genre.genreId} value={genre.genreName}>
              {genre.genreName}
            </option>
          ))}
        </select>
        <button disabled={!selectedGenre} onClick={handleUpdateGenre}>
          Update Genre
        </button>
      </span>
    </li>
  );
};

export default ModeratorSongsListItem;
