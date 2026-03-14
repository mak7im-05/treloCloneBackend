import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SearchService } from '../services/search.service';
import { Request } from 'express';

@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('boards/:boardId/cards')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'labelId', required: false, type: Number })
  @ApiQuery({ name: 'assigneeId', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  searchCards(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Query('q') q?: string,
    @Query('status') status?: string,
    @Query('labelId') labelId?: string,
    @Query('assigneeId') assigneeId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.searchService.searchCards(boardId, {
      q,
      status,
      labelId: labelId ? parseInt(labelId) : undefined,
      assigneeId: assigneeId ? parseInt(assigneeId) : undefined,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('boards')
  @ApiQuery({ name: 'q', required: true })
  searchBoards(
    @Req() req: Request & { user: { id: number } },
    @Query('q') q: string,
  ) {
    return this.searchService.searchBoards(req.user.id, q);
  }
}
