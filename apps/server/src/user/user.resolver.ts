import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Project, User, UserPostData } from './user.model';
import { ProjectType, UserService, UserType } from './user.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => [User])
  addUser(@Args('userPostData') userPostData: UserPostData) {
    const user = this.userService.addUser(userPostData);
    pubSub.publish('user', { user });
    return this.userService.getAll();
  }

  @Query(() => [User])
  async users() {
    return this.userService.getAll();
  }

  @ResolveField(() => [Project])
  projects(@Parent() user: UserType) {
    return this.userService.getProjects(user);
  }

  @Subscription(() => User)
  user() {
    return pubSub.asyncIterator('user');
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
