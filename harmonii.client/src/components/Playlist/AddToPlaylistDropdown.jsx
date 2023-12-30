/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePlaylistContext } from "../../services/hooks/usePlaylist";

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
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown-toggle"
        aria-expanded={isDropdownOpen}
      >
        {isDropdownOpen ? "Cancel" : "Add to Playlist"}
      </button>
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
          <button onClick={handleAddToPlaylist}>Add</button>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylistDropdown;
