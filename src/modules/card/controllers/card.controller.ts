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
import { CardService } from '../services/card.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { MoveCardDto } from '../dto/move-card.dto';
import { ReorderCardDto } from '../dto/reorder-card.dto';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('lists/:listId/cards')
  create(
    @Param('listId', ParseIntPipe) listId: number,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardService.create(listId, dto);
  }

  @Get('lists/:listId/cards')
  findAllByList(@Param('listId', ParseIntPipe) listId: number) {
    return this.cardService.findAllByList(listId);
  }

  @Get('cards/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findOne(id);
  }

  @Patch('cards/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCardDto) {
    return this.cardService.update(id, dto);
  }

  @Delete('cards/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.remove(id);
  }

  @Put('cards/:id/move')
  move(@Param('id', ParseIntPipe) id: number, @Body() dto: MoveCardDto) {
    return this.cardService.move(id, dto.targetListId, dto.order);
  }

  @Put('cards/reorder')
  reorder(@Body() dto: ReorderCardDto) {
    return this.cardService.reorder(dto.listId, dto.orderedIds);
  }
}
