import { Module } from '@nestjs/common';
import { BoardService } from './services/board.service';
import { BoardMemberService } from './services/board-member.service';
import { BoardController } from './controllers/board.controller';
import { BoardMemberController } from './controllers/board-member.controller';
import { BoardRoleGuard } from './guards/board-role.guard';

@Module({
  controllers: [BoardController, BoardMemberController],
  providers: [BoardService, BoardMemberService, BoardRoleGuard],
  exports: [BoardService, BoardMemberService, BoardRoleGuard],
})
export class BoardModule {}
