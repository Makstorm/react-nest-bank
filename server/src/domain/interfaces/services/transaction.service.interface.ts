import { CreateTransactionDto, Transaction } from '@domain';

export interface ITransactionService {
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findOne(id: number): Promise<Transaction>;

  remove(id: number): Promise<Transaction>;
}
