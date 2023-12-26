import { User, UserDocument } from '../../entities';

export interface IUserService {
  findById(id: string): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument>;
  isEmailTaken(email: string): Promise<boolean>;
  create(entity: Partial<User>): Promise<UserDocument>;
  markEmailAsConfirmed(email: string): Promise<void>;
}
