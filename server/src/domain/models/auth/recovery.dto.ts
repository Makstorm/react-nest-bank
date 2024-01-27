import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoveryDto {
  @ApiProperty({
    type: String,
    description: 'Should be of email format',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
