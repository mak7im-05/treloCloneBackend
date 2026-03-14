import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CardType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  status: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  listId: number;
}
