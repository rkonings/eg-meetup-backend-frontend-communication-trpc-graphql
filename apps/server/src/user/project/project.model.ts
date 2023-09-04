import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/user/task/task.model';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Task])
  tasks: Task[];
}

@InputType()
export class ProjectPostData {
  @Field()
  name: string;

  @Field(() => [Int], { nullable: true })
  tasks: number[] = [];

  @Field(() => [Int], { nullable: true })
  users: number[] = [];
}
