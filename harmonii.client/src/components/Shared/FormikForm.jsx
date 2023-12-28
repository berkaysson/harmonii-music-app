/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { StyledForm } from '../../styles/components/forms/Form.styles';

const FormikForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonText,
  children
}) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSelectChange = (fieldId, value) => {
    setFieldValue(fieldId, value);
  };

  return (
    <StyledForm onSubmit={handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === 'select' ? ( // Check for select input type
            <select
              id={field.id}
              value={values[field.id]}
              onChange={(e) => handleSelectChange(field.id, e.target.value)}
              onBlur={handleBlur}
              className={
                errors[field.id] && touched[field.id] ? 'input-error' : ''
              }
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
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
          )}
          {errors[field.id] && touched[field.id] && (
            <span>{errors[field.id]}</span>
          )}
        </div>
      ))}
      {children}
      <button disabled={isSubmitting} type="submit">
        {buttonText}
      </button>
    </StyledForm>
  );
};

export default FormikForm;
