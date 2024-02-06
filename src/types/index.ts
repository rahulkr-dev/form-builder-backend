import { Request } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ISignupUserRequest extends Request {
  body: IUser;
}
