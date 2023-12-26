import { useUserContext } from "../../services/hooks/useUser";
import { displayResponse } from "../../services/displayResponse";
import { loginApi } from "../../api/loginApi";
import { useNavigate } from "react-router";
import FormikForm from "../Shared/FormikForm";
import { loginSchema } from "../../services/auth/schema.yup";

const LoginForm = () => {
  const {login} = useUserContext();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = loginSchema;

  const handleLogin = async (values) => {
    const { email, password } = values;
    const response = await loginApi(email, password);
    if(response.name === "AxiosError"){
      console.log(response.response.status);
    }
    else{
      if(response.data.status === "Success"){
        login(response.data.data);
        displayResponse(response);
      }
      navigate("/");
    }
  }

  const fields = [
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
  ];

  return(
    <FormikForm 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      fields={fields}
      buttonText={"Login"}
    />
  );
};

export default LoginForm;
