import { Get, Controller } from '@nestjs/common';
import { TaskService, TaskType } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAll(): TaskType[] {
    // TODO
    return [];
  }
}
