import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BoardType } from '../types/board.type';
import { CreateBoardInput, UpdateBoardInput } from '../inputs/board.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { BoardService } from '../../board/services/board.service';

@Resolver(() => BoardType)
@UseGuards(GqlAuthGuard)
export class BoardResolver {
  constructor(private boardService: BoardService) {}

  @Query(() => [BoardType], { name: 'boards' })
  findAll(@CurrentUser() user: { id: number }) {
    return this.boardService.findAllByUser(user.id);
  }

  @Query(() => BoardType, { name: 'board' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.boardService.findOne(id);
  }

  @Mutation(() => BoardType)
  createBoard(
    @CurrentUser() user: { id: number },
    @Args('input') input: CreateBoardInput,
  ) {
    return this.boardService.create(user.id, input);
  }

  @Mutation(() => BoardType)
  updateBoard(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateBoardInput,
  ) {
    return this.boardService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteBoard(@Args('id', { type: () => Int }) id: number) {
    await this.boardService.remove(id);
    return true;
  }
}
