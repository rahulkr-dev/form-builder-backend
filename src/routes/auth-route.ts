import express, { NextFunction, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import signupValidator from "../validator/auth/signup-validator";
import UserRepository from "../database/UserRepository";
import TokenService from "../service/TokenService";
import CredentialService from "../service/CredentialService";
import loginValidator from "../validator/auth/login-validator";
import logger from "../config/logger";

const authRouter = express.Router();

const userRepository = new UserRepository();
const tokenService = new TokenService();
const credentialService = new CredentialService();
const authContoller = new AuthController(
  userRepository,
  tokenService,
  credentialService,
  logger,
);
authRouter.post(
  "/signup",
  signupValidator,
  (req: Request, res: Response, next: NextFunction) =>
    authContoller.signup(req, res, next),
);

authRouter.post(
  "/login",
  loginValidator,
  (req: Request, res: Response, next: NextFunction) =>
    authContoller.login(req, res, next),
);

export default authRouter;
