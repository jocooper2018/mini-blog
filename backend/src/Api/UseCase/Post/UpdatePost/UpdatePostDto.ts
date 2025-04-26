import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostDto {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  published?: boolean;
}
