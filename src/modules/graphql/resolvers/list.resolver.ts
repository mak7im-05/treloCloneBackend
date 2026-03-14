import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ListType } from '../types/list.type';
import { CreateListInput, ReorderListsInput } from '../inputs/list.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { ListService } from '../../list/services/list.service';

@Resolver(() => ListType)
@UseGuards(GqlAuthGuard)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Mutation(() => ListType)
  createList(
    @Args('boardId', { type: () => Int }) boardId: number,
    @Args('input') input: CreateListInput,
  ) {
    return this.listService.create(boardId, input);
  }

  @Mutation(() => Boolean)
  async deleteList(@Args('id', { type: () => Int }) id: number) {
    await this.listService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async reorderLists(@Args('input') input: ReorderListsInput) {
    await this.listService.reorder(input.boardId, input.orderedIds);
    return true;
  }
}
