import * as yup from "yup";

const errorMessages = {
  usernameMsg: "username must be a valid email",
  passMsg1: "password must be at least 8 characters",
  passMsg2: "password must be less than 32 characters",
  passMsg3: "password must contain at least one of this characters (!@#$%^&*)",
};
export const userSchema = yup.object().shape({
  username: yup.string().email(errorMessages.usernameMsg).required(),
  password: yup
    .string()
    .min(8, errorMessages.passMsg1)
    .max(32, errorMessages.passMsg2)
    .matches(/[!@#$%^&*()]/g, errorMessages.passMsg3)
    .required("Required"),
});
