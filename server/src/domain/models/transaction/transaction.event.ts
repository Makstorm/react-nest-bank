import { TransactionDocument } from '../../entities';

export const enum TransactionEventType {
  CREATED = 'created',
  DELETED = 'deleted',
}

export class TransactionEvent {
  public constructor(
    public readonly transaction: TransactionDocument,
    public readonly type: TransactionEventType,
  ) {}
}
