import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ISignupUserRequest } from "../types";
import UserRepository from "../database/UserRepository";
import createHttpError from "http-errors";
import TokenService from "../service/TokenService";
import { JwtPayload } from "jsonwebtoken";
import CredentialService from "../service/CredentialService";
import { Logger } from "winston";

class AuthController {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private credentialService: CredentialService,
    private logger: Logger,
  ) {}

  async signup(req: ISignupUserRequest, res: Response, next: NextFunction) {
    try {
      // Validation
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { name, email, password } = req.body;
      const isExits = await this.userRepository.findByEmail(email);
      if (isExits) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
      }
      const user = await this.userRepository.create({
        name,
        email,
        password,
        role: "Admin",
      });

      const payload: JwtPayload = {
        id: user._id,
        role: user.role,
      };

      const accessToken = this.tokenService.generateToken(payload);
      const refreshToken = this.tokenService.generateToken(payload);

      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, // Very important
      });

      res.cookie("refreshToken", refreshToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
        httpOnly: true, // Very important
      });

      res.json({ id: user._id });
    } catch (error) {
      next(error);
    }
  }

  async login(req: ISignupUserRequest, res: Response, next: NextFunction) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
      }

      const isMatch = await this.credentialService.comparePassword(
        password,
        user.password,
      );
      if (!isMatch) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
      }

      const payload: JwtPayload = {
        id: user._id,
        role: user.role,
      };
      const accessToken = this.tokenService.generateToken(payload);
      const refreshToken = this.tokenService.generateToken(payload);

      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, // Very important
      });

      res.cookie("refreshToken", refreshToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
        httpOnly: true, // Very important
      });

      res.json({ id: user._id });
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;
