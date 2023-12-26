import { useState } from "react";
import UploadProfileImage from "../components/Profile/UploadProfileImage";
import UserProfileInfo from "../components/Profile/UserProfileInfo";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";

const Profile = () => {
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <div>
      <UserProfileInfo key={refresh} />
      <UploadProfileImage fetchData={fetchData} />
      <ChangePasswordForm />
    </div>
  );
};

export default Profile;