import {
  IAuthService,
  IPasswordService,
  ITokenService,
  IUserService,
  JwtServiceTag,
  LoginDto,
  PasswordServiceTag,
  RegisterDto,
  UserAuth,
  UserDocument,
  UserServiceTag,
  UserTokenCreateDto,
} from '@domain';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(UserServiceTag)
  private readonly userService: IUserService;

  @Inject(JwtServiceTag)
  private readonly tokenService: ITokenService;

  @Inject(PasswordServiceTag)
  private readonly passwordService: IPasswordService;

  public async singIn(dto: UserTokenCreateDto): Promise<UserAuth> {
    const token = await this.tokenService.generateJwt({
      ...dto,
    });

    return new UserAuth(token);
  }

  public async getAuthenticatedUser(dto: LoginDto): Promise<UserDocument> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException(
        `Account with email ${dto.email} does not exist`,
      );
    }

    await this.passwordService.verifyPassword(dto.password, user.password);

    return user;
  }

  public async signUp(dto: RegisterDto): Promise<UserDocument> {
    const doesExists = await this.userService.isEmailTaken(dto.email);

    if (doesExists) {
      throw new BadRequestException(`Email ${dto.email} is already taken`);
    }

    const hashPassword = await this.passwordService.generateHashPassword(
      dto.password,
    );

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
      emailConfirmed: false,
      balance: 0,
    });

    user.password = undefined;

    return user;
  }
}
