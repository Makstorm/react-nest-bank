import { Transaction } from './transaction.entity';

export type User = {
  userId: number;
  email: string;
  username: string;
  password: string;
  emailConfirmed: boolean;
  balance: number;

  transactions: Transaction[];
};
