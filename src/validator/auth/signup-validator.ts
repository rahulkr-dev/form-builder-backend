import { checkSchema } from "express-validator";

export default checkSchema({
  name: {
    trim: true,
    errorMessage: "Name is required!",
    notEmpty: true,
  },
  email: {
    trim: true,
    errorMessage: "Email is required!",
    notEmpty: true,
    isEmail: {
      errorMessage: "Email should be a valid email",
    },
  },
  password: {
    trim: true,
    errorMessage: "Last name is required!",
    notEmpty: true,
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Password length should be at least 5 chars!",
    },
  },
});
