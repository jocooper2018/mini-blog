import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(3, 20)
  username: string;

  @Field()
  @IsString()
  @Length(8, 50)
  password: string;
}
