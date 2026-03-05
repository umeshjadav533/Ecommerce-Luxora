import * as yup from "yup";

const emailField = yup
  .string()
  .email("Invalid email")
  .required("Email is required")
  .trim()
  .lowercase();

const passwordField = yup
  .string()
  .required("Password is required.")
  .min(6, "Password must be at least 6 characters");

const phoneField = yup
  .string()
  .required("Phone number is required")
  .matches(/^[6-9]\d{9}$/, "Enter valid Indian phone number");

export const registerSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: emailField,
  password: passwordField,
  phoneNumber: phoneField,
});

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});

export const forgotPasswordSchema = yup.object({
  email: emailField,
});

export const resetPasswordSchema = yup.object({
  password: passwordField,
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});