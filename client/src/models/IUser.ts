import { ITransaction } from "./ITransaction";

export interface IUser {
  userId: number;
  email: string;
  username: string;
  password: string;
  emailConfirmed: boolean;
  balance: number;

  transactions: ITransaction[];
}
