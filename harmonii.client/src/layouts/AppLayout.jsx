import { BrowserRouter } from 'react-router-dom';
import RouterComponent from '../routers/Router';

const AppLayout = () => {
  return (
    <div>
      <BrowserRouter>
      {//ScrollToTop component
      // navigation, footer in browser router
      }
        <RouterComponent />
      </BrowserRouter>
    </div>
  );
};

export default AppLayout;
