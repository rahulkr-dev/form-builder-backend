import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const UserModal = model("UserModal", userSchema, "users");

export default UserModal;
