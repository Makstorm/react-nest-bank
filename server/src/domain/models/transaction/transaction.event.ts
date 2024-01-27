import { TransactionDocument } from '../../entities';

export const enum TransactionEventType {
  CREATED = 'created',
  DELETED = 'deleted',
  REMPLENISHMENTED = 'remplenishmented',
}

export class TransactionEvent {
  public constructor(
    public readonly transaction: TransactionDocument,
    public readonly type: TransactionEventType,
  ) {}
}
