import { Injectable } from '@nestjs/common';
import { TaskType } from 'src/user/task/task.service';
import { UserType } from 'src/user/user.service';
import { z } from 'zod';

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  tasks: z.number().array(),
  users: z.number().array(),
});

const InputProjectSchema = ProjectSchema.omit({ id: true });

export type InputProjectType = z.infer<typeof InputProjectSchema>;

export type ProjectType = z.infer<typeof ProjectSchema>;

type ProjectCollection = Map<ProjectType['id'], ProjectType>;

export const projectCollection: ProjectCollection = new Map();
projectCollection.set(0, {
  id: 0,
  name: 'Setup GraphQL',
  tasks: [0, 1, 2],
  users: [0, 1],
});

@Injectable()
export class ProjectService {
  getAll(): ProjectType[] {
    return Array.from(projectCollection.values());
  }

  getProjects(user: UserType): ProjectType[] {
    return user.projects.map((projectId) => projectCollection.get(projectId)!);
  }

  getProjectFromTask(task: TaskType): ProjectType {
    return projectCollection.get(task.project)!;
  }

  addProject(project: InputProjectType): ProjectType {
    const newProject = {
      id: projectCollection.size,
      name: project.name,
      tasks: project.tasks,
      users: project.users,
    };
    projectCollection.set(projectCollection.size, newProject);
    return newProject;
  }
}
