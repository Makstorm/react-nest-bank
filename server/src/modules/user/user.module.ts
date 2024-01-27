import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { User, UserSchema, UserServiceTag } from '@domain';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';
import { PasswordModule } from '../password';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PasswordModule,
  ],
  controllers: [UsersController],
  providers: [{ provide: UserServiceTag, useClass: UserService }],
  exports: [UserServiceTag],
})
export class UserModule {}
