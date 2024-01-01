import { useNavigate } from "react-router";
import { deletePlaylistApi } from "../../api/deletePlaylistApi";
import { removeSongFromPlaylist } from "../../api/removeSongFromPlaylist";
import { displayResponse } from "../../services/displayResponse";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { useUserContext } from "../../services/hooks/useUser";
import SongListItem from "../Song/SongListItem";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import styled from "styled-components";
import { RiPlayList2Line } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

/* eslint-disable react/prop-types */
const PlaylistDetails = ({ playlistData, fetchData }) => {
  const { user } = useUserContext();
  const { handlePlaylistSelect } = usePlaylistContext();
  const navigate = useNavigate();

  const handleRemoveFromPlaylist = async (songId) => {
    const response = await removeSongFromPlaylist(
      playlistData.playlistId,
      songId
    );
    if (!(response.name === "AxiosError")) {
      fetchData();
    }
    displayResponse(response);
  };

  const handlePlaylistPlay = () => {
    handlePlaylistSelect(playlistData);
  };

  const handleDelete = async () => {
    const response = await deletePlaylistApi(playlistData.playlistId);
    if (!(response.name === "AxiosError")) {
      navigate("/");
    }
    displayResponse(response);
  };

  return (
    <div>
      {playlistData ? (
        <>
          <StyledPlaylistInfo>
            <button className="playlist-details-icon-btn btn" onClick={handlePlaylistPlay}>
              <RiPlayList2Line /></button>
            <div>
              <h2 style={{padding: "0"}}>Playlist Name: {playlistData.playlistName}</h2>
              <h4>Creator: {playlistData.userName}</h4>
              <p style={{maxWidth: "500px"}}>Playlist Description: {playlistData.playlistDescription}</p>
            </div>
            {user.userName === playlistData.userName ? (
              <button className="playlist-details-icon-btn playlist-details-delete-btn btn" onClick={handleDelete}><RiDeleteBin2Line /></button>
            ) : (
              ""
            )}
          </StyledPlaylistInfo>
          <br />
          <h3>Songs:</h3>
          <br />
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {playlistData.songs.$values.map((song) => (
              <div key={song.songId} style={{ display: "flex", gap: "10px" }}>
                <SongListItem song={song} />
                {user.userName === playlistData.userName ? (
                  <button onClick={() => handleRemoveFromPlaylist(song.songId)}>
                    <RiIndeterminateCircleLine style={{ fontSize: "32px" }} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PlaylistDetails;

const StyledPlaylistInfo = styled.div`
  border: 1px solid var(--dark-blue-color);
  border-radius: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 4rem;
  padding: 1rem;
  background-color: var(--dark-blue-color);
  position: relative;

  .playlist-details-icon-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--turq-color-1);
    border-radius: 50%;
    height: 52px;
    width: 52px;
    padding: 5px;
    font-size: 40px;

    &:hover{
      color: var(--pink-color);
    }
  }

  @media(max-width: 700px){
    gap: 1rem;
    flex-direction: column;
  }

  .playlist-details-delete-btn{
    position: absolute;
    right: 1rem;
  }
`;