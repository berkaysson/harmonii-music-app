import { useNavigate } from 'react-router';
import LoginForm from '../components/Auth/LoginForm';
import { useUserContext } from '../services/hooks/useUser';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { userValid } = useUserContext();

  useEffect(() => {
    if(userValid){
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;