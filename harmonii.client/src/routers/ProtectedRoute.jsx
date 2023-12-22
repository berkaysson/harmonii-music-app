import { Navigate, Outlet } from 'react-router-dom';
import checkTokenValid from '../services/auth/checkTokenValid';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isValid = checkTokenValid(token);

    setIsTokenValid(isValid);
  }, []);

  return ( isTokenValid ? <Outlet />
  : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
