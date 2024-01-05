import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { UserDocument } from 'src/domain/entities';

export class UserModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String })
  public email: string;

  @ApiProperty({ type: String })
  public username: string;

  @ApiProperty({ type: String })
  public password: string;

  @ApiProperty({ type: Number, required: true })
  public balance: number;

  public static formEntity(user: UserDocument): UserModel {
    if (!user) {
      return null;
    }

    const model = new UserModel();

    model.id = user.id;
    model.email = user.email;
    model.balance = user.balance;
    model.username = user.username;
    model.password = user.password;

    return model;
  }
}
