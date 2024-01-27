import { UpdateUserDto } from '@domain';
import { User, UserDocument } from '../../entities';

export interface IUserService {
  findById(id: string): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument>;
  isEmailTaken(email: string): Promise<boolean>;
  create(entity: Partial<User>): Promise<UserDocument>;
  update(id: string, dto: UpdateUserDto): Promise<UserDocument>;
  markEmailAsConfirmed(email: string): Promise<void>;
  recoverPassword(email: string, newPassword: string): Promise<void>;
}
