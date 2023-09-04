import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

@InputType()
export class UserPostData {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
