import { registerApi } from "../../api/registerApi";
import { useNavigate } from "react-router";
import { displayResponse } from "../../services/displayResponse";
import { registerSchema } from "../../services/auth/schema.yup";
import FormikForm from "../Shared/FormikForm";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (values) => {
    const registerData = {
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    const response = await registerApi(registerData);
    if (!(response.name === "AxiosError")) {
      navigate("/login");
      setErrorMessage("");
    }
    else if(response.response.status === 400){
      setErrorMessage(response.response.data.statusMessage);
    }
    displayResponse(response);
  };

  const fields = [
    { id: "userName", label: "User Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <>
      <FormikForm
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleFormSubmit}
        fields={fields}
        buttonText="Register"
      />
      <span className="error-span">{errorMessage}</span>
    </>
  );
};

export default RegisterForm;
