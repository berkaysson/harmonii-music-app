import UserProfileInfo from "../components/Profile/UserProfileInfo";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";
import styled from "styled-components";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <StyledProfile
    className="main__container"
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: .2 }}
    >
      <UserProfileInfo />
      <ChangePasswordForm />
    </StyledProfile>
  );
};

export default Profile;

const StyledProfile = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;