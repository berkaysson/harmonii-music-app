/* eslint-disable react/prop-types */
import { StyledList } from "../Shared/StyledList";
import ModeratorSongsListItem from "./ModeratorSongsListItem";

const ModeratorSongsList = ({ songsList, fetchData, genresList }) => {

  return (
    <div>
      <h3>
        Songs
      </h3>
      <StyledList>
        {songsList.map((song) => (
            <ModeratorSongsListItem key={song.songId} genresList={genresList} song={song} fetchData={fetchData} />
        ))}
      </StyledList>
    </div>
  );
};

export default ModeratorSongsList;
