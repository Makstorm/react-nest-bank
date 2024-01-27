import { TransactionType } from "./enums/transaction.enum";

export interface ITransaction {
  id: number;
  type: TransactionType;
  amount: number;
  sender: string;
  senderEmail: string;
  receiver: string;
  receiverEmail: string;
  date: Date;
  category: string;
}
