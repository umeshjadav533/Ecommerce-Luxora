import * as yup from "yup";

export const checkoutSchema = yup.object({

  firstName: yup
    .string()
    .required("First name is required"),

  lastName: yup
    .string()
    .required("Last name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  street: yup
    .string()
    .required("Street is required"),

  city: yup
    .string()
    .required("City is required"),

  state: yup
    .string()
    .required("State is required"),

  pincode: yup
    .string()
    .required("Zipcode is required")

});