import { Controller, Post, Body } from '@nestjs/common';
import { ProjectService, ProjectType } from './project.service';
import { ProjectPostData } from './project.model';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() project: ProjectPostData): ProjectType {
    return this.projectService.addProject(project);
  }
}
