import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import StyledAppLayout from '../styles/components/layouts/AppLayout.styles';
import Footer from '../components/Footer/Footer';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;
