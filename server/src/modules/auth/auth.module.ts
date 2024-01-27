import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthServiceTag } from '@domain';
import { UserModule } from '../user';
import { TokenModule } from '../jwt';
import { JwtGuard, JwtStrategy, LocalStrategy } from '../../core';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email';
import { PasswordModule } from '../password';

@Module({
  imports: [
    UserModule,
    TokenModule,
    PassportModule,
    EmailModule,
    PasswordModule,
  ],
  providers: [
    { provide: AuthServiceTag, useClass: AuthService },
    JwtStrategy,
    LocalStrategy,
    JwtGuard,
  ],
  controllers: [AuthController],
  exports: [AuthServiceTag],
})
export class AuthModule {}
