import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import styled from 'styled-components';
import Footer from '../components/Shared/Footer';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      <div>audio player</div>
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto auto 50px;
  min-height: 100vh;
`;
