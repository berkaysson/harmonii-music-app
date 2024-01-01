import styled from "styled-components";
import { changePasswordApi } from "../../api/changePasswordApi";
import { changePasswordSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import { useUserContext } from "../../services/hooks/useUser";
import FormikForm from "../Shared/FormikForm";
import { useState } from "react";

const ChangePasswordForm = () => {
  const { logout } = useUserContext();
  const [errorMessage, setErrorMessage] = useState("");
  
  const initialValues = {
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const changePasswordData = {
      OldPassword: values.OldPassword,
      NewPassword: values.NewPassword,
    };

    const response = await changePasswordApi(changePasswordData);
    if (!(response.name === "AxiosError")) {
      setErrorMessage("");
      logout();
    }
    else if(response.response.status === 400){
      setErrorMessage(response.response.data.statusMessage);
    }    
    displayResponse(response);
  };

  const fields = [
    { id: "OldPassword", label: "Old Password", type: "password" },
    { id: "NewPassword", label: "New Password", type: "password" },
    { id: "ConfirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <StyledChangePasswordForm>
      <h2>Change Your Password</h2>
      <FormikForm
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
        fields={fields}
        buttonText="Change Password"
      />
      <span className="error-span">{errorMessage}</span>
    </StyledChangePasswordForm>
  );
};

export default ChangePasswordForm;

const StyledChangePasswordForm = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;