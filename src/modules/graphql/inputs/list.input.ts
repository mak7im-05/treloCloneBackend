import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field()
  title: string;
}

@InputType()
export class ReorderListsInput {
  @Field(() => Int)
  boardId: number;

  @Field(() => [Int])
  orderedIds: number[];
}
