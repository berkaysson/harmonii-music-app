import { useState } from "react";
import { displayResponse } from "../../services/displayResponse";
import { fetchAllUsers } from "../../api/fetchAllUsers";
import { confirmUserApi } from "../../api/confirmUserApi";
import { assignModeratorApi } from "../../api/assignModeratorApi";
import { deleteUserApi } from "../../api/deleteUserApi";
import { StyledList } from "../Shared/StyledList";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetUsers = async () => {
    setIsLoading(true);
    const response = await fetchAllUsers();
    if (!(response.name === "AxiosError")) {
      setUsers(response.data.data.$values);
    }
    displayResponse(response);
    setIsLoading(false);
  };

  const handleConfirmButton = async (identityId) => {
    const response = await confirmUserApi(identityId);
    if (!(response.name === "AxiosError")) {
      await handleGetUsers();
    }
    displayResponse(response);
  };

  const handleAssignModeratorButton = async (identityId) => {
    const response = await assignModeratorApi(identityId);
    if (!(response.name === "AxiosError")) {
      await handleGetUsers();
      setErrorMessage("");
    }
    else if(response.response.status === 400){
      setErrorMessage(response.response.data.statusMessage);
    }
    displayResponse(response);
  };

  const handleDeleteUserButton = async (identityId) => {
    const response = await deleteUserApi(identityId);
    if (!(response.name === "AxiosError")) {
      await handleGetUsers();
    }
    displayResponse(response);
  };

  return (
    <div>
      <button className="btn" onClick={handleGetUsers} disabled={isLoading}>
        Get All Users
      </button>
      <div>
        <h3>User List</h3>
        <StyledList>
        <span className="error-span">{errorMessage}</span>
          {users.map((user) => (
            <StyledUserListItem key={user.id}>
              <span>Identity Id: {user.id}</span>
              <span>
                {user.userName}\{user.email}
              </span>
              <span>
                {user.emailConfirmed ? (
                  <span>
                    <button
                      className="btn"
                      onClick={() => handleAssignModeratorButton(user.id)}
                    >
                      Assign Moderator Role
                    </button>
                  </span>
                ) : (
                  <span>
                    <button className="btn" onClick={() => handleConfirmButton(user.id)}>
                      Confirm
                    </button>
                  </span>
                )}

                <button style={{fontSize: "24px"}} className="btn" onClick={() => handleDeleteUserButton(user.id)}>
                  <RiDeleteBin2Line />
                </button>
              </span>
            </StyledUserListItem>
          ))}
        </StyledList>
      </div>
    </div>
  );
};

export default UserListComponent;

const StyledUserListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 0.2rem;
  background-color: var(--dark-blue-color);
  position: relative;
  padding: 1rem;
  gap: 1rem;

  span {
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span:last-child {
    position: absolute;
    right: 0;
  }

  @media(max-width: 1300px){
    align-items: flex-start;
    flex-direction: column;
    padding: .6rem;

    span:last-child{
      position: relative;
    }
  }
`;
