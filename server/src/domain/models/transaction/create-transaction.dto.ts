import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { TransactionType } from 'src/core';

export class CreateTransactionDto {
  @ApiProperty({ type: String, example: 'cool@email.com' })
  @IsEmail()
  public userEmail: string;

  @ApiProperty({ type: Number })
  public amount: number;

  @ApiProperty({
    description: 'List of posible variants',
    enum: TransactionType,
    isArray: false,
    example: TransactionType.CONSUMABLE,
  })
  public type: TransactionType;

  @ApiProperty({ type: String, example: 'cool@email.com' })
  @IsEmail()
  public recipientEmail: string;

  @ApiProperty({
    type: String,
    description: 'Transaction category',
    example: 'food',
  })
  public category: string;
}
