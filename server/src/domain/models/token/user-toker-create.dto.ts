import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class UserTokenCreateDto {
  @ApiProperty({
    type: Number,
    example: randomUUID(),
  })
  public id: number;

  @ApiProperty({
    type: String,
    description: 'Should be of email format',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ type: String, description: 'username', example: 'user228' })
  @IsNotEmpty()
  public username: string;
}
