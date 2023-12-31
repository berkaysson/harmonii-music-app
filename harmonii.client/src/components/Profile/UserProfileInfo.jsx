import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../api/fetchUserProfile';
import { displayResponse } from '../../services/displayResponse';
import styled from 'styled-components';

const UserProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserProfile();
      if (!(response.name === "AxiosError")) {
        setUserInfo(response.data.data);
      }
      displayResponse(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Error fetching user profile</div>;
  }

  return (
    <StyledUserProfile>
      <h2>User Profile Information</h2>
      <ul>
        <li>Username: {userInfo.userName}</li>
        <li>Email: {userInfo.email}</li>
        <li>User Profile ID: {userInfo.userProfileId}</li>
        <li>User Roles: {userInfo.userRoles.$values.join(', ')}</li>
      </ul>
    </StyledUserProfile>
  );
};

export default UserProfileInfo;

const StyledUserProfile = styled.div`
  background-color: var(--dark-blue-color);
  padding: 20px;
  border-radius: 5px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
`;
