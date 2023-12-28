import ModeratorSongsListItem from "./ModeratorSongsListItem";

// eslint-disable-next-line react/prop-types
const ModeratorSongsList = ({ songsList, fetchData, genresList }) => {

  return (
    <div>
      All songs table
      <ul>
        {songsList.map((song) => (
            <ModeratorSongsListItem key={song.songId} genresList={genresList} song={song} fetchData={fetchData} />
        ))}
      </ul>
    </div>
  );
};

export default ModeratorSongsList;
