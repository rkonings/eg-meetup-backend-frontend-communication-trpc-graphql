import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project, ProjectPostData } from './project.model';
import { ProjectService, ProjectType } from './project.service';
import { User } from 'src/user/user.model';
import { TaskService } from 'src/user/task/task.service';
import { UserService } from 'src/user/user.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  @Query(() => [Project])
  async projects() {
    return this.projectService.getAll();
  }

  @Mutation(() => Project)
  addProject(@Args('projectPostData') projectPostData: ProjectPostData) {
    const project = this.projectService.addProject(projectPostData);
    return project;
  }

  @ResolveField(() => [Project])
  tasks(@Parent() project: ProjectType) {
    return this.taskService.getTasks(project);
  }

  @ResolveField(() => [User])
  users(@Parent() project: ProjectType) {
    return this.userService.getUsers(project);
  }
}
