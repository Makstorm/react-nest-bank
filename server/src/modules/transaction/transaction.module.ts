import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionServiceTag } from '@domain';
import { UserModule } from '../user';

@Module({
  imports: [UserModule],
  controllers: [TransactionController],
  providers: [{ provide: TransactionServiceTag, useClass: TransactionService }],
})
export class TransactionModule {}
