import { LoginDto, RegisterDto, UserAuth } from '../../models';

export interface IAuthService {
  singIn(dto: LoginDto): Promise<UserAuth>;
  signUp(dto: RegisterDto): Promise<void>;
}
