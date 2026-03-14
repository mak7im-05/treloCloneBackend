import { Module } from '@nestjs/common';
import { BoardService } from './services/board.service';
import { BoardController } from './controllers/board.controller';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
