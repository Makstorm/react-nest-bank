import {
  CreateTransactionDto,
  TransactionDocument,
  UserDocument,
} from '@domain';

export interface ITransactionService {
  create(
    createTransactionDto: CreateTransactionDto,
    sender: UserDocument,
  ): Promise<TransactionDocument>;
  findAll(): Promise<TransactionDocument[]>;
  findOne(id: string): Promise<TransactionDocument>;

  remove(id: string): Promise<TransactionDocument>;
}
