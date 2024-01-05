export interface IUser {
  id: number;
  email: string;
  username: string;

  emailConfirmed?: boolean;
  balance?: number;

  transactions?: string[];
}
