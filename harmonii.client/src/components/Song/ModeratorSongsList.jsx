import ModeratorSongsListItem from "./ModeratorSongsListItem";

// eslint-disable-next-line react/prop-types
const ModeratorSongsList = ({ songsList, fetchData, genresList }) => {

  return (
    <div>
      All songs table
      <ul>
        {songsList.map((song) => (
          <li key={song.songId}>
            <ModeratorSongsListItem genresList={genresList} song={song} fetchData={fetchData} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeratorSongsList;
