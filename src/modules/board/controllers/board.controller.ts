import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BoardRoleGuard } from '../guards/board-role.guard';
import { Roles } from '../decorators/roles.decorator';
import { BoardService } from '../services/board.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Request } from 'express';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  create(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: CreateBoardDto,
  ) {
    return this.boardService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: Request & { user: { id: number } }) {
    return this.boardService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(BoardRoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(BoardRoleGuard)
  @Roles('admin', 'member')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoardDto) {
    return this.boardService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(BoardRoleGuard)
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
