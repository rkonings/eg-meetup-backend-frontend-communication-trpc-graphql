import { Injectable } from '@nestjs/common';
import { ProjectType } from 'src/user/project/project.service';
import { z } from 'zod';

const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  project: z.number(),
});

export type TaskType = z.infer<typeof TaskSchema>;

type TaskCollection = Map<TaskType['id'], TaskType>;

export const tasksCollection: TaskCollection = new Map();
tasksCollection.set(0, {
  id: 0,
  name: 'Install GraphQL',
  project: 0,
});

tasksCollection.set(1, {
  id: 1,
  name: 'Run GraphQL',
  project: 0,
});

tasksCollection.set(2, {
  id: 2,
  name: 'Query Data',
  project: 0,
});

@Injectable()
export class TaskService {
  getTasks(project: ProjectType): TaskType[] {
    return project.tasks.map((id) => tasksCollection.get(id)!);
  }
}
