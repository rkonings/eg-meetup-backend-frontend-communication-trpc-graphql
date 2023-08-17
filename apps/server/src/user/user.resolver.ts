import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project, User, UserPostData } from './user.model';
import { ProjectType, UserService, UserType } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => [User])
  addUser(@Args('userPostData') userPostData: UserPostData) {
    return this.userService.addUser(userPostData);
  }

  @Query(() => [User])
  async users() {
    return this.userService.getAll();
  }

  @ResolveField(() => [Project])
  projects(@Parent() user: UserType) {
    return this.userService.getProjects(user);
  }
}

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private userService: UserService) {}

  @ResolveField(() => [Project])
  tasks(@Parent() project: ProjectType) {
    return this.userService.getTasks(project);
  }
}
