import { Transaction } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomInt } from 'crypto';
import { TransactionType } from '../../../core';

export class TransactionModel {
  @ApiProperty({ type: Number, example: randomInt(100) })
  public id: number;

  @ApiProperty({
    description: 'List of posible variants',
    enum: TransactionType,
    isArray: false,
    example: TransactionType.CONSUMABLE,
  })
  public type: TransactionType;

  @ApiProperty({
    type: Number,
    description: 'money amount',
    example: randomInt(100),
  })
  public amount: number;

  @ApiProperty({
    type: Number,
    description: 'User who makes payment',
    example: randomInt(100),
  })
  public userId: number;

  @ApiProperty({
    type: Number,
    description: 'User who recieves payment',
    example: randomInt(100),
  })
  public recipientId: number;

  @ApiProperty({
    type: String,
    description: 'User who makes payment',
    example: new Date(),
  })
  public date: Date;

  public static formEntity(transaction: Transaction): TransactionModel {
    if (!transaction) {
      return null;
    }

    const model = new TransactionModel();

    model.id = transaction.id;
    model.type = transaction.type;
    model.amount = transaction.amount;
    model.userId = transaction.userId;
    model.recipientId = transaction.recipientId;
    model.date = transaction.date;
  }
}
