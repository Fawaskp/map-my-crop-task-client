import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a password"),
});

export const RegisterSchema = Yup.object({
  username: Yup.string().min(4).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter a password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

