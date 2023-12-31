import { useNavigate } from "react-router";
import RegisterForm from "../components/Auth/RegisterForm";
import { useUserContext } from "../services/hooks/useUser";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Register = () => {
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
      <RegisterForm />
    </motion.div>
  );
};

export default Register;