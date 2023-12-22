import { TransactionType } from '../../core';

export class Transaction {
  public id: number;
  public amount: number;
  public type: TransactionType;
  public userId: number;
  public date: Date;
  public recipientId: number;
  public category: string;
}
