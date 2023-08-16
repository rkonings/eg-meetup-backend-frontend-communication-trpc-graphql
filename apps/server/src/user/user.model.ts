import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
