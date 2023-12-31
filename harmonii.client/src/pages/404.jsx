import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledNotFound>
      <ErrorMessage>Page was not found</ErrorMessage>
      <Link to="/">Click To Go Home</Link>
    </StyledNotFound>
  );
};

export default NotFound;

const StyledNotFound = styled.div`
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
