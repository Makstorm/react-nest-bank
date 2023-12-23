import {
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
  // private users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     email: 'hello@mail.com',
  //     password: 'changeme',
  //     emailConfirmed: true,
  //     balance: 400,
  //     transactions: [],
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     email: 'hello2@mail.com',
  //     password: 'guess',
  //     emailConfirmed: true,
  //     balance: 400,
  //     transactions: [],
  //   },
  // ];

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
    // return this.users.find((el) => el.email === email) ? true : false;
    const user = await this.userModel.findOne({ email }).exec();

    return user ? true : false;
  }

  public async create(entity: Partial<User>): Promise<UserDocument> {
    // const newUser: User = {
    //   userId: this.users[this.users.length - 1].userId + 1,
    //   username: entity.username,
    //   email: entity.email,
    //   password: entity.password,
    //   emailConfirmed: false,
    //   balance: 0,
    //   transactions: [],
    // };

    const newUser = new this.userModel({
      username: entity.username,
      email: entity.email,
      password: entity.password,
      emailConfirmed: false,
      balance: 10000,
    });

    const result = await newUser.save();

    return result.id;
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
      bankId: payload.transaction.sender,
      recipientId: payload.transaction.receiver,
      money,
    };

    const user = await this.findById(resultParameters.bankId);
    const recipient = await this.findById(resultParameters.recipientId);

    user.balance = user.balance + money;
    payload.type === TransactionEventType.DELETED
      ? (user.transactions = user.transactions.filter(
          (el) => el !== payload.transaction.id,
        ))
      : user.transactions.push(payload.transaction.id);

    recipient.balance = recipient.balance - money;
    payload.type === TransactionEventType.DELETED
      ? (recipient.transactions = recipient.transactions.filter(
          (el) => el !== payload.transaction.id,
        ))
      : recipient.transactions.push(payload.transaction.id);

    user.save();
    recipient.save();
  }
}
