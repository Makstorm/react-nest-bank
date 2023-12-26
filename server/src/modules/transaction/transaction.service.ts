import {
  CreateTransactionDto,
  ITransactionService,
  IUserService,
  Transaction,
  TransactionDocument,
  TransactionEvent,
  TransactionEventType,
  UserDocument,
  UserServiceTag,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionType } from 'src/core';

@Injectable()
export class TransactionService implements ITransactionService {
  @InjectModel(Transaction.name)
  private readonly transactionModel: Model<Transaction>;

  @Inject(UserServiceTag) private readonly userService: IUserService;

  public constructor(private eventEmitter: EventEmitter2) {}

  public async create(
    createTransactionDto: CreateTransactionDto,
    sender: UserDocument,
  ): Promise<TransactionDocument> {
    // const transactionEntity = new Transaction();
    const transactionEntity = new this.transactionModel({
      amount: createTransactionDto.amount,
      category: createTransactionDto.category,
      type: TransactionType.CONSUMABLE,
    });

    const senderEntity = await this.userService.findById(sender.id);

    transactionEntity.sender = senderEntity.id;

    const receiver = await this.userService.findByEmail(
      createTransactionDto.receiverEmail,
    );
    transactionEntity.receiver = receiver.id;

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
