import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserServiceTag } from '@domain';

@Module({
  providers: [{ provide: UserServiceTag, useClass: UserService }],
  exports: [UserServiceTag],
})
export class UserModule {}
