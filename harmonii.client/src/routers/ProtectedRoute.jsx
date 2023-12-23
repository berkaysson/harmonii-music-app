import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../services/hooks/useUser';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const {userValid} = useUserContext();

  return ( userValid ? <Outlet />
  : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
