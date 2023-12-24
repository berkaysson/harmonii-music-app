import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import StyledAppLayout from '../styles/components/layouts/AppLayout.styles';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
    </StyledAppLayout>
  );
};

export default AppLayout;
