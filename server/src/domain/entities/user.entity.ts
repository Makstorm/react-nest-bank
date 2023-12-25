import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  public email: string;

  @Prop({ type: String, required: true })
  public username: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: Boolean, required: true })
  public emailConfirmed: boolean;

  @Prop({ type: Number, required: true })
  public balance: number;

  @Prop({
    type: [String],
  })
  public transactions: string[];

  @Prop()
  public createdAt?: Date;
  @Prop()
  public updatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
