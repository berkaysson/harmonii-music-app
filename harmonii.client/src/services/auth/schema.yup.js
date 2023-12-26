import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const registerSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "User name should be minimum 3 character")
    .max(32, "User name should be maximum 32 character")
    .required("Please enter username"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password should be minimum 6 character")
    .max(32, "Password should be maximum 32 character")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const songSchema = yup.object().shape({
  SongName: yup.string().required('Song name is required'),
  Artist: yup.string().required('Artist name is required'),
  CoverImageUrl: yup.string().url('Cover image URL is not valid').required(),
  AudioFileUrl: yup.string().url('Audio file URL is not valid').required(),
  GenreName: yup.string().required('Genre name is required'),
});