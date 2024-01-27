export interface IEmailService {
  sendVerificationLink(email: string): Promise<string>;
  sendPaswordRecoverLink(email: string): Promise<string>;
  decodeConfirmationToken(token: string): Promise<string>;
  confirmEmail(email: string): Promise<void>;
  recoverPassword(email: string, password: string): Promise<void>;
}
