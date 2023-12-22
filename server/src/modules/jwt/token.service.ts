import { ITokenService, UserTokenCreateDto } from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService implements ITokenService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async generateJwt(user: UserTokenCreateDto): Promise<string> {
    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}
