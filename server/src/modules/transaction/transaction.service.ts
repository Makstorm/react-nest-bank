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
  AccountRemplenishmentDto,
} from '@domain';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

    if (senderEntity.balance < createTransactionDto.amount) {
      throw new BadRequestException('Not enough funds on the balance sheet');
    }

    transactionEntity.sender = senderEntity.id;
    transactionEntity.senderEmail = senderEntity.email;

    const receiver = await this.userService.findByEmail(
      createTransactionDto.receiverEmail,
    );
    transactionEntity.receiver = receiver.id;
    transactionEntity.receiverEmail = receiver.email;

    transactionEntity.save();

    await this.emitingBankEvent(
      transactionEntity,
      TransactionEventType.CREATED,
    );

    return transactionEntity;
  }

  public async accountRemplenishment(
    dto: AccountRemplenishmentDto,
    receiver: UserDocument,
  ): Promise<TransactionDocument> {
    // const transactionEntity = new Transaction();
    const transactionEntity = new this.transactionModel({
      amount: dto.amount,
      category: dto.remplenishmer,
      type: TransactionType.REMPLENISHMENTED,
    });

    transactionEntity.sender = dto.remplenishmer;

    const receiverDoc = await this.userService.findById(receiver.id);
    transactionEntity.receiver = receiverDoc.id;

    transactionEntity.save();

    await this.emitingBankEvent(
      transactionEntity,
      TransactionEventType.REMPLENISHMENTED,
    );

    return transactionEntity;
  }

  public async findAll(userId: string): Promise<TransactionDocument[]> {
    const transactions: TransactionDocument[] = [];
    const send = await this.transactionModel.find({ sender: userId });
    if (send && send.length !== 0) {
      transactions.push(
        ...send.map((doc) => doc.toObject() as TransactionDocument),
      );
    }
    const receipt = await this.transactionModel.find({ receiver: userId });

    if (receipt && receipt.length !== 0) {
      transactions.push(
        ...receipt.map((doc) => doc.toObject() as TransactionDocument),
      );
    }

    const sortedTransactions = transactions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return sortedTransactions;
  }

  public async findOne(id: string): Promise<TransactionDocument> {
    try {
      const transaction = await this.transactionModel.findById(id);

      if (!transaction) {
        throw new BadRequestException(`There is no transaction with id: ${id}`);
      }

      return transaction;
    } catch (e) {
      throw new BadRequestException(`There is no transaction with id: ${id}`);
    }
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
