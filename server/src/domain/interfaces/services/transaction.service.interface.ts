import {
  AccountRemplenishmentDto,
  CreateTransactionDto,
  TransactionDocument,
  UserDocument,
} from '@domain';

export interface ITransactionService {
  create(
    createTransactionDto: CreateTransactionDto,
    sender: UserDocument,
  ): Promise<TransactionDocument>;
  findAll(userId: string): Promise<TransactionDocument[]>;
  findOne(id: string): Promise<TransactionDocument>;

  remove(id: string): Promise<TransactionDocument>;

  accountRemplenishment(
    dto: AccountRemplenishmentDto,
    receiver: UserDocument,
  ): Promise<TransactionDocument>;
}
