import { TransactionType } from "./enums/transaction.enum";

export interface ITransaction {
  id: number;
  amount: number;
  type: TransactionType;
  userId: number;
  date: Date;
  recipientId: number;
  category: string;
}
