import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskType } from './task.service';
import { ProjectService } from 'src/user/project/project.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private projectService: ProjectService) {}

  @ResolveField(() => Task)
  project(@Parent() task: TaskType) {
    return this.projectService.getProjectFromTask(task);
  }
}
