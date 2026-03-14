import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Request } from 'express';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('cards/:cardId/comments')
  create(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Req() req: Request & { user: { id: number } },
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.create(cardId, req.user.id, dto.body);
  }

  @Get('cards/:cardId/comments')
  findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentService.findAllByCard(cardId);
  }

  @Delete('comments/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
}
