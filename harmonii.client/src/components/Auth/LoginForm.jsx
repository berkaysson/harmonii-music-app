import { useUserContext } from "../../services/hooks/useUser";
import { displayResponse } from "../../services/displayResponse";
import { loginApi } from "../../api/loginApi";
import { useNavigate } from "react-router";
import FormikForm from "../Shared/FormikForm";
import { loginSchema } from "../../services/auth/schema.yup";
import { useState } from "react";

const LoginForm = () => {
  const {login} = useUserContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = loginSchema;

  const handleLogin = async (values) => {
    const { email, password } = values;
    const response = await loginApi(email, password);
    if (!(response.name === "AxiosError")) {
      login(response.data.data);
      navigate("/");
      setErrorMessage("");
    }
    else if(response.response.status === 400){
      setErrorMessage(response.response.data.statusMessage);
    }
    displayResponse(response);
  }

  const fields = [
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
  ];

  return(<>    <FormikForm 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleLogin}
    fields={fields}
    buttonText={"Login"}
  />
  <span className="error-span">{errorMessage}</span>
  </>

  );
};

export default LoginForm;
