import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema, TransactionServiceTag } from '@domain';
import { UserModule } from '../user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UserModule,
  ],
  controllers: [TransactionController],
  providers: [{ provide: TransactionServiceTag, useClass: TransactionService }],
})
export class TransactionModule {}
