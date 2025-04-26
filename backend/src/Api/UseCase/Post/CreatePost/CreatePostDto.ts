import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreatePostDto {
  @Field(() => Int)
  authorId: number;

  @Field()
  title: string;

  @Field()
  content: string;
}
