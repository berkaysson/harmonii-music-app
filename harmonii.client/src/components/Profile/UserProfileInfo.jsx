import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../api/fetchUserProfile';
import { displayResponse } from '../../services/displayResponse';

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
    <div>
      <h2>User Profile Information</h2>
      <ul>
        <li>Username: {userInfo.userName}</li>
        <li>Email: {userInfo.email}</li>
        <li>User Profile ID: {userInfo.userProfileId}</li>
        <li>User Roles: {userInfo.userRoles.$values.join(', ')}</li>
      </ul>
    </div>
  );
};

export default UserProfileInfo;
