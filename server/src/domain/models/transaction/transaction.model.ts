import { TransactionDocument } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomInt, randomUUID } from 'crypto';
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
    type: String,
    description: 'User who makes payment',
    example: randomUUID(),
  })
  public sender: string;

  @ApiProperty({
    type: String,
    description: 'User who recieves payment',
    example: randomUUID(),
  })
  public receiver: string;

  @ApiProperty({
    type: String,
    description: 'User who makes payment',
    example: new Date(),
  })
  public date: Date;

  public static formEntity(transaction: TransactionDocument): TransactionModel {
    if (!transaction) {
      return null;
    }

    const model = new TransactionModel();

    model.id = transaction.id;
    model.type = transaction.type;
    model.amount = transaction.amount;
    model.sender = transaction.sender;
    model.receiver = transaction.receiver;
    model.date = transaction.createdAt;

    return model;
  }
}
