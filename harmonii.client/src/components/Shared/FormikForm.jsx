/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { StyledForm } from '../../styles/components/forms/Form.styles';

const FormikForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonText,
}) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <StyledForm onSubmit={handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            type={field.type}
            id={field.id}
            value={values[field.id]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors[field.id] && touched[field.id] ? 'input-error' : ''
            }
          />
          {errors[field.id] && touched[field.id] && (
            <span>{errors[field.id]}</span>
          )}
        </div>
      ))}
      <button disabled={isSubmitting} type="submit">
        {buttonText}
      </button>
    </StyledForm>
  );
};

export default FormikForm;
