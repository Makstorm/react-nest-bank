import {
  ConfirmEmailDto,
  EmailServiceTag,
  IEmailService,
  PasswordRecoveryDto,
} from '@domain';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  @Inject(EmailServiceTag) private readonly service: IEmailService;

  @Post('confirm')
  public async confirmEmail(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.service.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.service.confirmEmail(email);
  }

  @Post('recover')
  public async passwordRecovery(@Body() dto: PasswordRecoveryDto) {
    const email = await this.service.decodeConfirmationToken(dto.token);

    await this.service.recoverPassword(email, dto.password);
  }
}
