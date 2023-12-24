import { BrowserRouter } from 'react-router-dom';
import RouterComponent from '../routers/Router';
import { UserContextProvider } from '../services/hooks/useUser';
import Navigation from '../components/Navigation/Navigation';
import StyledAppLayout from '../styles/components/layouts/AppLayout.styles';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <UserContextProvider>
        <BrowserRouter>
        <Navigation />
        {//ScrollToTop component
        // navigation, footer in browser router
        }
          <RouterComponent />
        </BrowserRouter>
      </UserContextProvider>
    </StyledAppLayout>
  );
};

export default AppLayout;
