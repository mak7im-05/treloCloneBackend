import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsArray } from 'class-validator';

@InputType()
export class CreateListInput {
  @Field()
  @IsString()
  title: string;
}

@InputType()
export class ReorderListsInput {
  @Field(() => Int)
  @IsInt()
  boardId: number;

  @Field(() => [Int])
  @IsArray()
  orderedIds: number[];
}
