import { useNavigate } from 'react-router';
import LoginForm from '../components/Auth/LoginForm';
import { useUserContext } from '../services/hooks/useUser';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
    className="main__container"
    initial={{ transform: "scale(0)" }}
    animate={{ transform: "scale(1)" }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: .2 }}
    >
      <LoginForm />
    </motion.div>
  );
};

export default Login;