import { Transaction } from '../../entities';

export const enum TransactionEventType {
  CREATED = 'created',
  DELETED = 'deleted',
}

export class TransactionEvent {
  public constructor(
    public readonly transaction: Transaction,
    public readonly type: TransactionEventType,
  ) {}
}
