import {
  CreateUserDto,
  IUserService,
  TransactionEvent,
  TransactionEventType,
  User,
  UserDocument,
} from '@domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionType } from '../../core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService implements IUserService {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  public async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      throw new BadRequestException(`There is no bank with email: ${email}`);
    }

    return user;
  }

  public async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new BadRequestException(`There is no bank with id: ${id}`);
    }

    return user;
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();

    return user ? true : false;
  }

  public async create(dto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel({
      ...dto,
    });

    const result = await newUser.save();

    return result;
  }

  public async markEmailAsConfirmed(email: string): Promise<void> {
    const updateEmailUser = await this.findByEmail(email);

    updateEmailUser.emailConfirmed = true;

    updateEmailUser.save();
  }

  @OnEvent('transaction.created')
  @OnEvent('transaction.deleted')
  public async recalculateBankBalance(
    payload: TransactionEvent,
  ): Promise<void> {
    const transactionAmount =
      payload.transaction.type === TransactionType.CONSUMABLE
        ? -payload.transaction.amount
        : payload.transaction.amount;

    const money =
      payload.type === TransactionEventType.DELETED
        ? -transactionAmount
        : transactionAmount;

    const resultParameters = {
      sender: payload.transaction.sender,
      receiver: payload.transaction.receiver,
      money,
    };

    const user = await this.findById(resultParameters.sender);
    const recipient = await this.findById(resultParameters.receiver);

    user.balance = user.balance + money;
    recipient.balance = recipient.balance - money;

    payload.type === TransactionEventType.DELETED
      ? (user.transactions = user.transactions.filter(
          (el) => el !== payload.transaction.id,
        ))
      : user.transactions.push(payload.transaction.id);

    payload.type === TransactionEventType.DELETED
      ? (recipient.transactions = recipient.transactions.filter(
          (el) => el !== payload.transaction.id,
        ))
      : recipient.transactions.push(payload.transaction.id);

    user.save();
    recipient.save();
  }
}
