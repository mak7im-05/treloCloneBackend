import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CardType } from '../types/card.type';
import {
  CreateCardInput,
  UpdateCardInput,
  MoveCardInput,
  ReorderCardsInput,
} from '../inputs/card.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CardService } from '../../card/services/card.service';

@Resolver(() => CardType)
@UseGuards(GqlAuthGuard)
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Mutation(() => CardType)
  createCard(
    @Args('listId', { type: () => Int }) listId: number,
    @Args('input') input: CreateCardInput,
  ) {
    return this.cardService.create(listId, input);
  }

  @Mutation(() => CardType)
  updateCard(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCardInput,
  ) {
    return this.cardService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteCard(@Args('id', { type: () => Int }) id: number) {
    await this.cardService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async moveCard(@Args('input') input: MoveCardInput) {
    await this.cardService.move(input.id, input.targetListId, input.order);
    return true;
  }

  @Mutation(() => Boolean)
  async reorderCards(@Args('input') input: ReorderCardsInput) {
    await this.cardService.reorder(input.listId, input.orderedIds);
    return true;
  }
}
