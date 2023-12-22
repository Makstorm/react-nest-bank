import { User } from '../../entities';

export interface IUserService {
  findByEmail(email: string): Promise<User | undefined>;
  isEmailTaken(email: string): Promise<boolean>;
  create(entity: Partial<User>): Promise<User>;
  markEmailAsConfirmed(email: string): Promise<void>;
}
