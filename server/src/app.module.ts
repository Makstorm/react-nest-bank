import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules';
import { EmailModule } from './modules/email/email.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { uri: config.getOrThrow('MONGODB_STR') };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    AuthModule,
    EmailModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
