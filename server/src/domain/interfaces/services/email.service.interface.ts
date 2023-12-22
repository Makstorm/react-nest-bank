export interface IEmailService {
  sendVerificationLink(email: string): Promise<string>;
  decodeConfirmationToken(token: string): Promise<string>;
  confirmEmail(email: string): Promise<void>;
}
