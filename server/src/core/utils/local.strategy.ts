import { AuthServiceTag, IAuthService, UserDocument } from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthServiceTag)
    private authenticationService: IAuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<UserDocument> {
    return this.authenticationService.getAuthenticatedUser({
      email: email,
      password: password,
    });
  }
}
