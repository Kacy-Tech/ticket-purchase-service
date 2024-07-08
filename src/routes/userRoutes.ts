import express from "express";
import { registerUser, authUser } from "../controllers/userController";
import {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} from "../utils/validators";

const router = express.Router();

router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
router.post("/login", validateUserLogin, handleValidationErrors, authUser);

export default router;
