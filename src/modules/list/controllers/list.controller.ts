import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ListService } from '../services/list.service';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { ReorderListDto } from '../dto/reorder-list.dto';

@ApiTags('Lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ListController {
  constructor(private listService: ListService) {}

  @Post('boards/:boardId/lists')
  create(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: CreateListDto,
  ) {
    return this.listService.create(boardId, dto);
  }

  @Get('boards/:boardId/lists')
  findAll(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.listService.findAllByBoard(boardId);
  }

  @Get('lists/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listService.findOne(id);
  }

  @Patch('lists/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateListDto) {
    return this.listService.update(id, dto);
  }

  @Delete('lists/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listService.remove(id);
  }

  @Put('boards/:boardId/lists/reorder')
  reorder(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: ReorderListDto,
  ) {
    return this.listService.reorder(boardId, dto.orderedIds);
  }
}
