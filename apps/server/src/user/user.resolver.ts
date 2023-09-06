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

import { User, UserPostData } from './user.model';
import { UserService, UserType } from './user.service';
import { Project } from 'src/user/project/project.model';
import { ProjectService } from 'src/user/project/project.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  @Mutation(() => User)
  addUser(@Args('userPostData') userPostData: UserPostData) {
    const user = this.userService.addUser(userPostData);
    pubSub.publish('user', { user });
    return user;
  }

  @Query(() => [User])
  users() {
    return this.userService.getAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('userId') userId: number) {
    return this.userService.getById(userId);
  }

  @ResolveField(() => [Project])
  projects(@Parent() user: UserType) {
    return this.projectService.getProjects(user);
  }

  @Subscription(() => User)
  userAdded() {
    return pubSub.asyncIterator('user');
  }
}
