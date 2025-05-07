import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export default class CreateCommentDto {
  @Field(() => Int)
  authorId: number;

  @Field(() => Int)
  postId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}