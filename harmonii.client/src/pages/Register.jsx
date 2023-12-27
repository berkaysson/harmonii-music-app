import { useNavigate } from "react-router";
import RegisterForm from "../components/Auth/RegisterForm";
import { useUserContext } from "../services/hooks/useUser";
import { useEffect } from "react";

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
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;