export interface IPasswordService {
  generateHashPassword(password: string): Promise<string>;
  verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
