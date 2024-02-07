import bycryt from "bcryptjs";

export default class CredentialService {
  async comparePassword(password: string, hash: string) {
    return await bycryt.compare(password, hash);
  }
}
