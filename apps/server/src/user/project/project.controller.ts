import { Get, Controller } from '@nestjs/common';
import { ProjectService, ProjectType } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAll(): ProjectType[] {
    // TODO
    return [];
  }
}
