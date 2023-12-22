import {
  CreateTransactionDto,
  ITransactionService,
  IUserService,
  Transaction,
  TransactionEvent,
  TransactionEventType,
  UserServiceTag,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TransactionService implements ITransactionService {
  @Inject(UserServiceTag) private readonly userService: IUserService;

  public constructor(private eventEmitter: EventEmitter2) {}

  private transactions: Transaction[] = [];

  public async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transactionEntity = new Transaction();

    transactionEntity.id =
      this.transactions.length === 0
        ? 1
        : this.transactions[this.transactions.length - 1].id + 1;
    transactionEntity.amount = createTransactionDto.amount;
    transactionEntity.date = new Date();
    transactionEntity.type = createTransactionDto.type;

    const user = await this.userService.findByEmail(
      createTransactionDto.userEmail,
    );

    transactionEntity.userId = user.userId;

    const recipient = await this.userService.findByEmail(
      createTransactionDto.recipientEmail,
    );
    transactionEntity.recipientId = recipient.userId;
    transactionEntity.category = createTransactionDto.category;

    this.transactions.push(transactionEntity);

    await this.emitingBankEvent(
      transactionEntity,
      TransactionEventType.CREATED,
    );

    return transactionEntity;
  }

  public async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  public async findOne(id: number): Promise<Transaction> {
    return this.transactions.find((el) => el.id === id);
  }

  public async remove(id: number): Promise<Transaction> {
    const transactionForDelete = await this.findOne(id);
    this.transactions = this.transactions.filter((el) => el.id !== id);

    await this.emitingBankEvent(
      transactionForDelete,
      TransactionEventType.DELETED,
    );

    return transactionForDelete;
  }

  private async emitingBankEvent(
    transaction: Transaction,
    type: TransactionEventType,
  ): Promise<void> {
    this.eventEmitter.emit(
      'transaction.' + type,
      new TransactionEvent(transaction, type),
    );
  }
}
