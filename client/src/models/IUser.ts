export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  emailConfirmed: boolean;
  balance: number;

  transactions: string[];
}
