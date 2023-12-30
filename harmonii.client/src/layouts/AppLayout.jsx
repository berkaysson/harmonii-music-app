import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import styled from 'styled-components';
import Footer from '../components/Shared/Footer';
import AudioPlayer from '../components/Song/AudioPlayer';
import { useUserContext } from '../services/hooks/useUser';

const AppLayout = () => {
  const { userValid } = useUserContext();

  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      {userValid && <AudioPlayer />}
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto 120px 50px;
  min-height: 100vh;
`;
