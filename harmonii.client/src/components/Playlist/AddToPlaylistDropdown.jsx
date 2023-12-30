/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";
import { RiPlayListLine } from "react-icons/ri";
import { RiArrowGoBackLine } from "react-icons/ri";
import { RiAddCircleLine } from "react-icons/ri";

const AddToPlaylistDropdown = ({ onAddToPlaylist }) => {
  const { userPlaylists } = usePlaylistContext();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePlaylistChange = (event) => {
    setSelectedPlaylistId(event.target.value);
  };

  const handleAddToPlaylist = async () => {
    console.log(selectedPlaylistId);
    await onAddToPlaylist(selectedPlaylistId);
    setSelectedPlaylistId("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <select value={selectedPlaylistId} onChange={handlePlaylistChange}>
            <option value="">Select Playlist</option>
            {userPlaylists.map((playlist) => (
              <option key={playlist.playlistId} value={playlist.playlistId}>
                {playlist.playlistName}
              </option>
            ))}
          </select>
          <button style={{ fontSize: "24px" }} onClick={handleAddToPlaylist}>
            <RiAddCircleLine />
          </button>
        </div>
      )}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown-toggle"
        aria-expanded={isDropdownOpen}
        style={{ fontSize: "24px" }}
      >
        {isDropdownOpen ? <RiArrowGoBackLine /> : <RiPlayListLine />}
      </button>
    </div>
  );
};

export default AddToPlaylistDropdown;
