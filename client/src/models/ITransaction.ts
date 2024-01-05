import { TransactionType } from "./enums/transaction.enum";

export interface ITransaction {
  id: number;
  amount: number;
  type: TransactionType;
  sender: string;
  date: Date;
  receiver: string;
  category: string;
}
