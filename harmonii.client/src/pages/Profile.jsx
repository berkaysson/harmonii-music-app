import UserProfileInfo from "../components/Profile/UserProfileInfo";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";
import styled from "styled-components";

const Profile = () => {
  return (
    <StyledProfile>
      <UserProfileInfo />
      <ChangePasswordForm />
    </StyledProfile>
  );
};

export default Profile;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;