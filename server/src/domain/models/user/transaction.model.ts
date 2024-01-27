import { UserDocument } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class UserModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({
    type: String,
    description: 'List of posible variants',

    example: 'cool@email.com',
  })
  public emai: string;

  @ApiProperty({
    type: String,
    description: 'username',

    example: 'pt4shk4',
  })
  public username: string;

  @ApiProperty({
    type: Number,
    description: 'Balance',

    example: 0,
  })
  public balance: number;

  public static formEntity(user: UserDocument): UserModel {
    if (!user) {
      return null;
    }

    const model = new UserModel();

    model.id = user.id;
    model.emai = user.email;
    model.username = user.username;
    model.balance = user.balance;

    return model;
  }
}
