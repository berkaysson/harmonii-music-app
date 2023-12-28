import { changePasswordApi } from "../../api/changePasswordApi";
import { changePasswordSchema } from "../../services/auth/schema.yup";
import { displayResponse } from "../../services/displayResponse";
import { useUserContext } from "../../services/hooks/useUser";
import FormikForm from "../Shared/FormikForm";

const ChangePasswordForm = () => {
  const {logout} = useUserContext();

  const initialValues = {
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  };

  const handleSubmit = async (values) => {
    const changePasswordData = {
      OldPassword: values.OldPassword,
      NewPassword: values.NewPassword
    }

    const response = await changePasswordApi(changePasswordData);
    if (!(response.name === "AxiosError")) {
      logout();
    }
    displayResponse(response);
  }

  const fields = [
    { id: 'OldPassword', label: 'Old Password', type: 'password' },
    { id: 'NewPassword', label: 'New Password', type: 'password' },
    { id: 'ConfirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Change Password"
    />
  );
};

export default ChangePasswordForm;