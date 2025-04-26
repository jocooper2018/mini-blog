import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 20)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(8, 50)
  password?: string;
}
