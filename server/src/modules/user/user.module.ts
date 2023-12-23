import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { User, UserSchema, UserServiceTag } from '@domain';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: UserServiceTag, useClass: UserService }],
  exports: [UserServiceTag],
})
export class UserModule {}
