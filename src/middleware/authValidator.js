import { body, check } from "express-validator";

const authValidator = {
  passwordValidator: [
    body("password")
      .trim()
      .exists({ checkFalsy: false })
      .withMessage("Password is required.")
      .isLength({ min: 3 })
      .withMessage("Password must be a minmum of 3 characters.")
      .isAlphanumeric()
      .withMessage("Password must be alphanumeric.")
  ],
  emailValidator: [
    check("email")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Email is required.")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address.")
  ]
};

export default authValidator;
