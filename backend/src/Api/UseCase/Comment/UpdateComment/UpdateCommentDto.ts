import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class UpdateCommentDto {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly content: string;
}
