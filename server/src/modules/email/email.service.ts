import {
  IEmailService,
  IPasswordService,
  IPostmarkService,
  IUserService,
  PasswordServiceTag,
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

  @Inject(PasswordServiceTag)
  private readonly passwordService: IPasswordService;

  @Inject()
  private readonly configService: ConfigService;

  // Sends to user email while his registration
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

  public async sendPaswordRecoverLink(email: string): Promise<string> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.getOrThrow(
      'PASSWORD_RECOVERY_URL',
    )}?token=${token}`;

    const text = `Hi there! To change your password, click here: ${url}`;

    try {
      await this.postmarkService.sendEmail(email, 'Password recovery', text);
      return 'Passwork recovery sent successfully';
    } catch (error) {
      console.log(error.message);
    }
  }

  //decode email after it receives it from front-end
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

  //mark email as confirmed
  public async confirmEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user.emailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async recoverPassword(email: string, password: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Something went wrong!');
    }

    const newHashPassword =
      await this.passwordService.generateHashPassword(password);

    await this.userService.recoverPassword(email, newHashPassword);
  }
}

interface VerificationTokenPayload {
  email: string;
}
