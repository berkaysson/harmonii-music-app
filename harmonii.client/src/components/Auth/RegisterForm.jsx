import { registerApi } from "../../api/registerApi";
import { useNavigate } from "react-router";
import { displayResponse } from "../../services/displayResponse";
import { useFormik } from "formik";
import { registerSchema } from "../../services/auth/schema.yup";
import { StyledForm } from "../../styles/components/forms/Form.styles";

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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <StyledForm onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="userName">User Name:</label>
      <input
        type="text"
        id="userName"
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.userName && touched.userName ? "input-error" : ""}
      />
      {errors.userName && touched.userName && <span>{errors.userName}</span>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? "input-error" : ""}
      />
      {errors.email && touched.email && <span>{errors.email}</span>}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password ? "input-error" : ""}
      />
      {errors.password && touched.password && <span>{errors.password}</span>}
      <button disabled={isSubmitting} type="submit">
        Register
      </button>
    </StyledForm>
  );
};

export default RegisterForm;
