/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService, UserType } from './user.service';
import { ProjectService, ProjectType } from 'src/user/project/project.service';
import { ProjectPostData } from 'src/user/project/project.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private projectService: ProjectService) {}

  @Get()
  getAll(): UserType[] {
    return this.userService.getAll();
  }

  @Post()
  createProject(@Body() project: ProjectPostData): ProjectType {
    return this.projectService.addProject(project);
  }
}
