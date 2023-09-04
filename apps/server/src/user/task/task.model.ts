import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/user/project/project.model';
import { ProjectType } from 'src/user/project/project.service';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Project)
  project: ProjectType;
}
