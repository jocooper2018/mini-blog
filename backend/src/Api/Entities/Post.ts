import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  authorId: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
