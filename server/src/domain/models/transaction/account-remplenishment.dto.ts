import { ApiProperty } from '@nestjs/swagger';
import { Remplenishments } from '../../../core';

export class AccountRemplenishmentDto {
  @ApiProperty({
    description: 'List of posible variants',
    enum: Remplenishments,
    isArray: false,
    example: Remplenishments.STRIPE,
  })
  public remplenishmer: string;

  @ApiProperty({ type: Number })
  public amount: number;
}
