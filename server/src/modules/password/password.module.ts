import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordServiceTag } from '@domain';

@Module({
  providers: [{ provide: PasswordServiceTag, useClass: PasswordService }],
  exports: [PasswordServiceTag],
})
export class PasswordModule {}
