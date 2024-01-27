import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransactionType } from '../../core';

import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: String })
  public sender: string;

  @Prop({ type: String })
  public senderEmail: string;

  @Prop({ type: String })
  public receiver: string;

  @Prop({ type: String })
  public receiverEmail: string;

  @Prop({ type: Number })
  public amount: number;

  @Prop({
    type: String,
    enum: TransactionType,
    default: TransactionType.CONSUMABLE,
  })
  public type: TransactionType;

  @Prop({ type: String })
  public category: string;

  @Prop()
  public createdAt?: Date;
  @Prop()
  public updatedAt?: Date;
}

export type TransactionDocument = HydratedDocument<Transaction>;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// export class Transaction {
//   public id: number;
//   public userId: string;
//   public recipientId: string;
//   public amount: number;
//   public type: TransactionType;
//   public category: string;
//   public date: Date;
// }
