import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledNotFound
      className="main__container"
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <ErrorMessage>Page was not found</ErrorMessage>
      <Link to="/">Click To Go Home</Link>
    </StyledNotFound>
  );
};

export default NotFound;

const StyledNotFound = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const ErrorMessage = styled.h1`
  font-size: 2rem;
  color: var(--pink-color);
`;
