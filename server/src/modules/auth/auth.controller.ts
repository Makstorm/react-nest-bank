import {
  AuthServiceTag,
  EmailServiceTag,
  IAuthService,
  IEmailService,
  LoginDto,
  RegisterDto,
  UserAuth,
} from '@domain';
import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthServiceTag)
  private readonly service: IAuthService;

  @Inject(EmailServiceTag)
  private readonly emailService: IEmailService;

  @ApiResponse({
    type: UserAuth,
  })
  @UsePipes(new ValidationPipe())
  @Post('sighIn')
  public async signIn(@Body() dto: LoginDto): Promise<UserAuth> {
    return await this.service.singIn(dto);
  }

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  public async signUp(@Body() dto: RegisterDto): Promise<void> {
    const user = await this.service.signUp(dto);
    // await this.emailService.sendVerificationLink(dto.email);
    return user;
  }
}
