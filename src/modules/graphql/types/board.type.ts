import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ListType } from './list.type';

@ObjectType()
export class BoardType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  color: string | null;

  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Field()
  isStarred: boolean;

  @Field(() => [ListType], { nullable: true })
  lists?: ListType[];
}
