import {
  CreateTransactionDto,
  ITransactionService,
  IUserService,
  Transaction,
  TransactionDocument,
  TransactionEvent,
  TransactionEventType,
  UserServiceTag,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService implements ITransactionService {
  @InjectModel(Transaction.name)
  private readonly transactionModel: Model<Transaction>;

  @Inject(UserServiceTag) private readonly userService: IUserService;

  public constructor(private eventEmitter: EventEmitter2) {}

  public async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    // const transactionEntity = new Transaction();
    const transactionEntity = new this.transactionModel({
      amount: createTransactionDto.amount,
      category: createTransactionDto.category,
      type: createTransactionDto.type,
    });

    const user = await this.userService.findByEmail(
      createTransactionDto.userEmail,
    );

    transactionEntity.sender = user.id;

    const recipient = await this.userService.findByEmail(
      createTransactionDto.recipientEmail,
    );
    transactionEntity.receiver = recipient.id;

    transactionEntity.save();

    await this.emitingBankEvent(
      transactionEntity,
      TransactionEventType.CREATED,
    );

    return transactionEntity;
  }

  public async findAll(): Promise<TransactionDocument[]> {
    return this.transactionModel.find();
  }

  public async findOne(id: string): Promise<TransactionDocument> {
    return this.transactionModel.findById(id);
  }

  public async remove(id: string): Promise<TransactionDocument> {
    const deletedTransaction = await this.transactionModel.findOneAndDelete({
      _id: id,
    });

    await this.emitingBankEvent(
      deletedTransaction,
      TransactionEventType.DELETED,
    );

    return deletedTransaction;
  }

  private async emitingBankEvent(
    transaction: TransactionDocument,
    type: TransactionEventType,
  ): Promise<void> {
    this.eventEmitter.emit(
      'transaction.' + type,
      new TransactionEvent(transaction, type),
    );
  }
}
