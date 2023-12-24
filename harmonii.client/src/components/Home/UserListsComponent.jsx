import { useState } from "react";
import { displayResponse } from "../../services/displayResponse";
import { fetchAllUsers } from "../../api/fetchAllUsers";

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllUsers();
      setUsers(response.data.data.$values);
      displayResponse(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={handleGetUsers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get All Users'}
      </button>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.userName} 
            {user.emailConfirmed ? "" : "(not confirmed)"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserListComponent;