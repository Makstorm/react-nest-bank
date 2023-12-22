import {
  IUserService,
  TransactionEvent,
  TransactionEventType,
  User,
} from '@domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionType } from '../../core';

@Injectable()
export class UserService implements IUserService {
  private users: User[] = [
    {
      userId: 1,
      username: 'john',
      email: 'hello@mail.com',
      password: 'changeme',
      emailConfirmed: true,
      balance: 400,
      transactions: [],
    },
    {
      userId: 2,
      username: 'maria',
      email: 'hello2@mail.com',
      password: 'guess',
      emailConfirmed: true,
      balance: 400,
      transactions: [],
    },
  ];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((el) => el.email === email);

    if (!user) {
      throw new BadRequestException(`There is no bank with email: ${email}`);
    }

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = this.users.find((el) => el.userId === id);
    if (!user) {
      throw new BadRequestException(`There is no bank with id: ${id}`);
    }

    return user;
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    return this.users.find((el) => el.email === email) ? true : false;
  }

  public async create(entity: Partial<User>): Promise<User> {
    const newUser: User = {
      userId: this.users[this.users.length - 1].userId + 1,
      username: entity.username,
      email: entity.email,
      password: entity.password,
      emailConfirmed: false,
      balance: 0,
      transactions: [],
    };

    this.users.push(newUser);

    return newUser;
  }

  public async markEmailAsConfirmed(email: string): Promise<void> {
    (await this.findByEmail(email)).emailConfirmed = true;
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
      bankId: payload.transaction.userId,
      recipientId: payload.transaction.recipientId,
      money,
    };

    const user = await this.findById(resultParameters.bankId);
    const recipient = await this.findById(resultParameters.recipientId);

    user.balance = user.balance + money;
    payload.type === TransactionEventType.DELETED
      ? (user.transactions = user.transactions.filter(
          (el) => el.id !== payload.transaction.id,
        ))
      : user.transactions.push(payload.transaction);

    recipient.balance = recipient.balance - money;
    payload.type === TransactionEventType.DELETED
      ? (recipient.transactions = recipient.transactions.filter(
          (el) => el.id !== payload.transaction.id,
        ))
      : recipient.transactions.push(payload.transaction);
  }
}
