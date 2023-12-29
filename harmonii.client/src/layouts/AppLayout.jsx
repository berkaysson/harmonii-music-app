import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import styled from 'styled-components';
import Footer from '../components/Shared/Footer';
import AudioPlayer from '../components/Song/AudioPlayer';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      <AudioPlayer />
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto 100px 50px;
  min-height: 100vh;
`;
