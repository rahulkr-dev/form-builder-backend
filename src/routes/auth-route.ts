import express, { NextFunction, Request, Response } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = express.Router();
const authContoller = new AuthController();
authRouter.post(
  "/auth/signup",
  (req: Request, res: Response, next: NextFunction) =>
    authContoller.signup(req, res, next),
);
