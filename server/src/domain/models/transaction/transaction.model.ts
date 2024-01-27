import { TransactionDocument } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomInt, randomUUID } from 'crypto';
import { TransactionType } from '../../../core';

export class TransactionModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

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
    description: 'User id who makes payment',
    example: randomUUID(),
  })
  public sender: string;

  @ApiProperty({
    type: String,
    description: 'User email who makes payment',
    example: 'cool@email.com',
  })
  public senderEmail: string;

  @ApiProperty({
    type: String,
    description: 'User id who recieves payment',
    example: randomUUID(),
  })
  public receiver: string;

  @ApiProperty({
    type: String,
    description: 'User email who recieves payment',
    example: 'cool2@email.com',
  })
  public receiverEmail: string;

  @ApiProperty({
    type: Date,
    description: 'Transaction time',
    example: new Date(),
  })
  public date: Date;

  @ApiProperty({
    type: String,
    description: 'Transaction category',
    example: 'Food',
  })
  public category: string;

  public static formEntity(transaction: TransactionDocument): TransactionModel {
    if (!transaction) {
      return null;
    }

    const model = new TransactionModel();

    model.id = transaction._id.toString();
    model.type = transaction.type;
    model.amount = transaction.amount;
    model.sender = transaction.sender;
    model.senderEmail = transaction.senderEmail;
    model.receiver = transaction.receiver;
    model.receiverEmail = transaction.receiverEmail;
    model.date = transaction.createdAt;
    model.category = transaction.category;

    return model;
  }
}
