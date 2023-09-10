import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService, UserType } from './user.service';
import { ProjectService, ProjectType } from 'src/user/project/project.service';
import { ProjectPostData } from 'src/user/project/project.model';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  @Get()
  getAll(): UserType[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): UserType | undefined {
    const user = this.userService.getById(parseInt(id));

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  createProject(@Body() project: ProjectPostData): ProjectType {
    return this.projectService.addProject(project);
  }
}
