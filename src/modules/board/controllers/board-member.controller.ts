import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BoardRoleGuard } from '../guards/board-role.guard';
import { Roles } from '../decorators/roles.decorator';
import { BoardMemberService } from '../services/board-member.service';
import {
  AddMemberDto,
  UpdateRoleDto,
  AssignCardDto,
} from '../dto/add-member.dto';

@ApiTags('Board Members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, BoardRoleGuard)
@Controller()
export class BoardMemberController {
  constructor(private boardMemberService: BoardMemberService) {}

  // ─── Members ──────────────────────────────────────────────────────

  @Get('boards/:boardId/members')
  getMembers(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.boardMemberService.getMembers(boardId);
  }

  @Post('boards/:boardId/members')
  @Roles('admin')
  addMember(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: AddMemberDto,
  ) {
    return this.boardMemberService.addMember(boardId, dto.userId, dto.role);
  }

  @Patch('boards/:boardId/members/:userId')
  @Roles('admin')
  updateRole(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.boardMemberService.updateRole(boardId, userId, dto.role);
  }

  @Delete('boards/:boardId/members/:userId')
  @Roles('admin')
  removeMember(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.boardMemberService.removeMember(boardId, userId);
  }

  // ─── Card Assignment ──────────────────────────────────────────────

  @Get('cards/:cardId/assignees')
  getAssignees(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.boardMemberService.getCardAssignees(cardId);
  }

  @Post('cards/:cardId/assignees')
  assignCard(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() dto: AssignCardDto,
  ) {
    return this.boardMemberService.assignCard(cardId, dto.userId);
  }

  @Delete('cards/:cardId/assignees/:userId')
  unassignCard(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.boardMemberService.unassignCard(cardId, userId);
  }
}
