import {
  IAuthService,
  ITokenService,
  IUserService,
  JwtServiceTag,
  LoginDto,
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
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(UserServiceTag)
  private readonly userService: IUserService;

  @Inject(JwtServiceTag)
  private readonly tokenService: ITokenService;

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

    await this.verifyPassword(dto.password, user.password);

    return user;
  }

  public async signUp(dto: RegisterDto): Promise<UserDocument> {
    const doesExists = await this.userService.isEmailTaken(dto.email);

    if (doesExists) {
      throw new BadRequestException(`Email ${dto.email} is already taken`);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    user.password = undefined;

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrond credentials provided');
    }
  }
}
