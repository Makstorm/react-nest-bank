import { UserTokenCreateDto } from '@domain';

export interface ITokenService {
  generateJwt(user: UserTokenCreateDto): Promise<string>;
}
