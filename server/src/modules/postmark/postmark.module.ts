import { Module } from '@nestjs/common';
import { PostmarkService } from './postmark.service';
import { PostmarkServiceTag } from '@domain';

@Module({
  imports: [],
  providers: [{ provide: PostmarkServiceTag, useClass: PostmarkService }],
  exports: [PostmarkServiceTag],
})
export class PostmarkModule {}
