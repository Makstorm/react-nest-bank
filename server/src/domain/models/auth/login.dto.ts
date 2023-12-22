import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Login that was used in registration',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ type: String, description: 'Your password' })
  @IsNotEmpty()
  public password: string;
}
