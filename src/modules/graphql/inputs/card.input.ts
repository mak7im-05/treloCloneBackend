import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateCardInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  status?: string;
}

@InputType()
export class MoveCardInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  targetListId: number;

  @Field(() => Int)
  order: number;
}

@InputType()
export class ReorderCardsInput {
  @Field(() => Int)
  listId: number;

  @Field(() => [Int])
  orderedIds: number[];
}
