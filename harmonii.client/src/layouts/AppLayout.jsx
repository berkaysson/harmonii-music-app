import { BrowserRouter } from 'react-router-dom';
import RouterComponent from '../routers/Router';
import { UserContextProvider } from '../services/hooks/useUser';

const AppLayout = () => {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
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
