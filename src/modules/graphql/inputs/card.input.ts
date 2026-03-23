import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

@InputType()
export class CreateCardInput {
  @Field()
  @IsString()
  title: string;
}

@InputType()
export class UpdateCardInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;
}

@InputType()
export class MoveCardInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => Int)
  @IsInt()
  targetListId: number;

  @Field(() => Int)
  @IsInt()
  order: number;
}

@InputType()
export class ReorderCardsInput {
  @Field(() => Int)
  @IsInt()
  listId: number;

  @Field(() => [Int])
  @IsArray()
  orderedIds: number[];
}
