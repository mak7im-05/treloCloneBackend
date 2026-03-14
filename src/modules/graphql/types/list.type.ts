import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CardType } from './card.type';

@ObjectType()
export class ListType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field(() => [CardType], { nullable: true })
  cards?: CardType[];
}
