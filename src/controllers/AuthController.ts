import { Request, Response, NextFunction } from "express";
class AuthController {
  constructor() {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ status: true });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
