import { UserDocument } from '@domain';
import {
  LoginDto,
  RegisterDto,
  UserAuth,
  UserTokenCreateDto,
} from '../../models';

export interface IAuthService {
  singIn(dto: UserTokenCreateDto): Promise<UserAuth>;
  signUp(dto: RegisterDto): Promise<UserDocument>;
  getAuthenticatedUser(dto: LoginDto): Promise<UserDocument>;
}
