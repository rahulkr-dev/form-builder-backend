import { IUser } from "../types";
import UserModal from "./../modals/user-modal";

export default class UserRepository {
  // Todo- need to pass usermodal as dependiency injection
  constructor() {}
  async create({ email, password, name }: IUser) {
    const user = await UserModal.create({
      email,
      password,
      name,
    });

    return user;
  }
}
