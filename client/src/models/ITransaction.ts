import { TransactionType } from "./enums/transaction.enum";

export interface ITransaction {
  id: number;
  type: TransactionType;
  amount: number;
  sender: string;
  receiver: string;
  date: Date;
  category: string;
}
