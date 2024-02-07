import { Schema, model } from "mongoose";
import { IUser } from "../types";

// interface IUserModal extends Document

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModal = model("UserModal", userSchema, "users");

export default UserModal;
