import express from "express";
import AuthController from "../controllers/authController";
import authValidator from "../middleware/authValidator";
import validate from "../middleware/validate";
import checkDuplicate from "../middleware/checkDuplicate";
import ValidateToken from "../middleware/validateToken";

const router = express.Router();

const { emailValidator, passwordValidator } = authValidator;
const { checkExistingUser } = checkDuplicate;

router.post(
  "/signup",
  emailValidator,
  passwordValidator,
  validate,
  checkExistingUser,
  AuthController.createAccount
);

router.post(
  "/login",
  emailValidator,
  passwordValidator,
  validate,
  AuthController.login
);

router.post("/logout", ValidateToken.checkToken, AuthController.logOut);

router.post("/reset-password", AuthController.resetLink);

router.put("/reset/:id/:token", AuthController.resetPassword)

export default router;
