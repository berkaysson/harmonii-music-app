import DeleteSongButton from "./DeleteSongButton";

// eslint-disable-next-line react/prop-types
const ModeratorSongsList = ({ songsList, fetchData }) => {
  return (
    <div>
      All songs table
      <ul>
        {songsList.map((song) => (
          <li key={song.songId}>
            {song.songName}
            <span>
              <DeleteSongButton songId={song.songId} onDelete={fetchData} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeratorSongsList;
