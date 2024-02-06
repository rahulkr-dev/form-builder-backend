import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ISignupUserRequest } from "../types";
import UserRepository from "../database/UserRepository";

class AuthController {
  constructor(private userRepository: UserRepository) {}

  async signup(req: ISignupUserRequest, res: Response, next: NextFunction) {
    try {
      // Validation
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { name, email, password } = req.body;
      const user = await this.userRepository.create({
        name,
        email,
        password,
        role: "Admin",
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
