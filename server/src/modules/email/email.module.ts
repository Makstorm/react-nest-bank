import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtModule } from '@nestjs/jwt';
import { PostmarkModule } from '../postmark';
import { EmailServiceTag } from '@domain';
import { EmailController } from './email.controller';
import { UserModule } from '../user';
import { PasswordModule } from '../password';

@Module({
  imports: [JwtModule, PostmarkModule, UserModule, PasswordModule],
  providers: [{ provide: EmailServiceTag, useClass: EmailService }],
  exports: [EmailServiceTag],
  controllers: [EmailController],
})
export class EmailModule {}
