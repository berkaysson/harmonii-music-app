import { BrowserRouter } from 'react-router-dom';
import RouterComponent from '../routers/Router';
import { UserContextProvider } from '../services/hooks/useUser';
import Navigation from '../components/Navigation/Navigation';

const AppLayout = () => {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
        <Navigation />
        {//ScrollToTop component
        // navigation, footer in browser router
        }
          <RouterComponent />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
};

export default AppLayout;
