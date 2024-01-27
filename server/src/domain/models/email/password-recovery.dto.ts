import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class PasswordRecoveryDto {
  @ApiProperty({
    type: String,
    description: 'JWT with encoded email value',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @IsNotEmpty()
  public password: string;
}
