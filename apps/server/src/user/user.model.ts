import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Task])
  tasks: Task[];
}

@ObjectType()
export class User {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => [Project])
  projects: Project[];
}

@InputType()
export class UserPostData {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
