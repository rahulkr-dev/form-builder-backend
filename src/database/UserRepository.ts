import { IUser } from "../types";
import UserModal from "./../modals/user-modal";
import bycryt from "bcryptjs";

export default class UserRepository {
  // Todo- need to pass usermodal as dependiency injection
  constructor() {}
  async create({ email, password, name }: IUser) {
    const salt = 10;
    const hashPassword = await bycryt.hash(password, salt);
    const user = await UserModal.create({
      email,
      password: hashPassword,
      name,
    });

    return user;
  }

  async findByEmail(email: string) {
    return await UserModal.findOne({ email });
  }
}
