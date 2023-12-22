import {
  IAuthService,
  ITokenService,
  IUserService,
  JwtServiceTag,
  LoginDto,
  RegisterDto,
  User,
  UserAuth,
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

  public async singIn(dto: LoginDto): Promise<UserAuth> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException(
        `Account with email ${dto.email} does not exist`,
      );
    }

    const comparePassword = await bcrypt.compare(dto.password, user.password);

    if (!comparePassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const userTokenDto = new UserTokenCreateDto();

    userTokenDto.id = user.userId;

    userTokenDto.email = user.email;

    userTokenDto.username = user.username;

    const token = await this.tokenService.generateJwt(userTokenDto);

    return new UserAuth(token);
  }

  public async signUp(dto: RegisterDto): Promise<void> {
    const doesExists = await this.userService.isEmailTaken(dto.email);

    if (doesExists) {
      throw new BadRequestException(`Email ${dto.email} is already taken`);
    }

    const user: Partial<User> = {};

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    user.password = hashPassword;
    user.username = dto.userName;
    user.email = dto.email;

    await this.userService.create(user);
  }
}
