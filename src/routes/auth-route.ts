import express, { NextFunction, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import signupValidator from "../validator/auth/signup-validator";
import UserRepository from "../database/UserRepository";
import UserModal from "../modals/user-modal";

const authRouter = express.Router();

const userRepository = new UserRepository(UserModal);
const authContoller = new AuthController(userRepository);
authRouter.post(
  "/signup",
  signupValidator,
  (req: Request, res: Response, next: NextFunction) =>
    authContoller.signup(req, res, next),
);

export default authRouter;
