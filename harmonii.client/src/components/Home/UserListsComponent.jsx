import { useState } from "react";
import { displayResponse } from "../../services/displayResponse";
import { fetchAllUsers } from "../../api/fetchAllUsers";
import { confirmUserApi } from "../../api/confirmUserApi";

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUsers = async () => {
    setIsLoading(true);
    const response = await fetchAllUsers();
    if(response.name === "AxiosError"){
      console.log(response.response.status);
    }
    else{
      if(response.data.status === "Success"){
        setUsers(response.data.data.$values);
        displayResponse(response);
      }
    }
    setIsLoading(false);
  };

  const handleConfirmButton = async (identityId) => {
    const response = await confirmUserApi(identityId);
    if(response.name === "AxiosError"){
      console.log(response.response.status);
    }
    else{
      if(response.data.status === "Success"){
        await handleGetUsers();
        displayResponse(response);
      }
    }
  }

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
            {user.emailConfirmed ? "" : 
            <span>Not confirmed
              <button onClick={()=>handleConfirmButton(user.id)}>Confirm</button>
              </span>}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserListComponent;