import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'Should be of email format',
    example: 'cool@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email?: string;

  @ApiProperty({
    type: String,
    description: 'Shoud be of nickname format',
    example: 'Pt4shk4',
  })
  @IsNotEmpty()
  public username?: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsNotEmpty()
  public password?: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsNotEmpty()
  public oldPassword?: string;
}
