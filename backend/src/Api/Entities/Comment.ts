import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  authorId: number;

  @Field(() => Int)
  postId: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
