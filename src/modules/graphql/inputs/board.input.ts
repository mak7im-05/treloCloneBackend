import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}

@InputType()
export class UpdateBoardInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Boolean, { nullable: true })
  isStarred?: boolean;
}
