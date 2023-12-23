import { CreateTransactionDto, TransactionDocument } from '@domain';

export interface ITransactionService {
  create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument>;
  findAll(): Promise<TransactionDocument[]>;
  findOne(id: string): Promise<TransactionDocument>;

  remove(id: string): Promise<TransactionDocument>;
}
