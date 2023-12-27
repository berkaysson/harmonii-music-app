import SongListItem from "../Song/SongListItem"

/* eslint-disable react/prop-types */
const PlaylistDetails = ({playlistData}) => {
  return(
    <div>
    {playlistData ? (
      <>
        <h2>Playlist Name: {playlistData.playlistName}</h2>
        <h4>Creator: {playlistData.userName}</h4>
        <p>Playlist Description: {playlistData.playlistDescription}</p>
        <h3>Songs:</h3>
        <ul>
          {playlistData.songs.$values.map((song) => (
            <SongListItem song={song} key={song.songId} />
          ))}
        </ul>
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
  );
}

export default PlaylistDetails;