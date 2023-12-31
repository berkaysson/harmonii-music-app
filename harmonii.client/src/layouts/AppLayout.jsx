import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import styled from 'styled-components';
import AudioPlayer from '../components/Song/AudioPlayer';
import { useUserContext } from '../services/hooks/useUser';

const AppLayout = () => {
  const { userValid } = useUserContext();

  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      {userValid && <AudioPlayer />}
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 120px;
  height: 100%;
  position: relative;
`;
