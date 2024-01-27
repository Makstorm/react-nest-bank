import {
  AuthServiceTag,
  EmailServiceTag,
  IAuthService,
  IEmailService,
  LoginDto,
  RecoveryDto,
  RegisterDto,
  RequestWithUser,
  UserAuth,
  UserModel,
} from '@domain';
import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthenticationGuard } from '../../core';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthServiceTag)
  private readonly service: IAuthService;

  @Inject(EmailServiceTag)
  private readonly emailService: IEmailService;

  @ApiBody({ type: LoginDto })
  @ApiResponse({
    type: UserAuth,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthenticationGuard)
  @Post('sighIn')
  public async signIn(@Req() req: RequestWithUser): Promise<UserAuth> {
    const { user } = req;

    return await this.service.singIn({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  public async signUp(@Body() dto: RegisterDto): Promise<UserModel> {
    const user = await this.service.signUp(dto);
    await this.emailService.sendVerificationLink(dto.email);
    return UserModel.formEntity(user);
  }

  @Post('recovery')
  @UsePipes(new ValidationPipe())
  public async recoveryPassword(@Body() dto: RecoveryDto): Promise<void> {
    await this.emailService.sendPaswordRecoverLink(dto.email);
  }
}
