import {
  IEmailService,
  IPostmarkService,
  IUserService,
  PostmarkServiceTag,
  UserServiceTag,
} from '@domain';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService implements IEmailService {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject(PostmarkServiceTag)
  private readonly postmarkService: IPostmarkService;

  @Inject(UserServiceTag)
  private readonly userService: IUserService;

  @Inject()
  private readonly configService: ConfigService;

  public async sendVerificationLink(email: string): Promise<string> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.getOrThrow(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    try {
      await this.postmarkService.sendEmail(email, 'Email confirmation', text);
      return 'Verification email sent successfully';
    } catch (error) {
      console.log(error.message);
    }
  }

  public async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload: VerificationTokenPayload = await this.jwtService.verify(
        token,
        {
          secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        },
      );

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async confirmEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user.emailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }
}

interface VerificationTokenPayload {
  email: string;
}
