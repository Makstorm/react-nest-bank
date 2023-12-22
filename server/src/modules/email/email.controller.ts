import { ConfirmEmailDto, EmailServiceTag, IEmailService } from '@domain';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  @Inject(EmailServiceTag) private readonly service: IEmailService;

  @Post('confirm')
  public async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.service.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.service.confirmEmail(email);
  }
}
