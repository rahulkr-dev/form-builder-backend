import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";

export default class TokenService {
  constructor() {}

  generateToken(payload: JwtPayload) {
    const token = sign(payload, Config.ACCESS_TOKEN_SECRET!, {
      algorithm: "HS256",
      expiresIn: "1y",
      jwtid: String(payload._id),
    });

    return token;
  }
}
