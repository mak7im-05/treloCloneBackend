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
import { LabelService } from '../services/label.service';
import { CreateLabelDto } from '../dto/create-label.dto';
import { UpdateLabelDto } from '../dto/update-label.dto';

@ApiTags('Labels')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Post('boards/:boardId/labels')
  create(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: CreateLabelDto,
  ) {
    return this.labelService.create(boardId, dto);
  }

  @Get('boards/:boardId/labels')
  findAllByBoard(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.labelService.findAllByBoard(boardId);
  }

  @Patch('labels/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLabelDto) {
    return this.labelService.update(id, dto);
  }

  @Delete('labels/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.labelService.remove(id);
  }

  @Post('cards/:cardId/labels/:labelId')
  addToCard(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.labelService.addToCard(cardId, labelId);
  }

  @Delete('cards/:cardId/labels/:labelId')
  removeFromCard(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.labelService.removeFromCard(cardId, labelId);
  }
}
