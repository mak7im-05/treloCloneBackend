import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';

@Module({
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
