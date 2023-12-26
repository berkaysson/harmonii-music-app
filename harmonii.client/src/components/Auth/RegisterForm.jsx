import { registerApi } from "../../api/registerApi";
import { useNavigate } from "react-router";
import { displayResponse } from "../../services/displayResponse";
import { registerSchema } from "../../services/auth/schema.yup";
import FormikForm from "../Shared/FormikForm";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const registerData = {
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    const response = await registerApi(registerData);
    if (response.name === "AxiosError") {
      console.log(response);
    } else {
      if (response.data.status === "Success") {
        displayResponse(response);
      }
      navigate("/login");
    }
  };

  const fields = [
    { id: 'userName', label: 'User Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <FormikForm
      initialValues={{
        userName: "",
        email: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={handleFormSubmit}
      fields={fields}
      buttonText="Register"
    />
  );
};

export default RegisterForm;
