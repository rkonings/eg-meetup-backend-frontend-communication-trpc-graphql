import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
});

type TaskType = z.infer<typeof TaskSchema>;

type TaskCollection = Map<TaskType['id'], TaskType>;

const tasksCollection: TaskCollection = new Map();
tasksCollection.set(0, {
  id: 0,
  name: 'Install GraphQL',
});

tasksCollection.set(1, {
  id: 1,
  name: 'Run GraphQL',
});

tasksCollection.set(2, {
  id: 2,
  name: 'Query Data',
});

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  tasks: z.number().array(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;

type ProjectCollection = Map<ProjectType['id'], ProjectType>;

const projectCollection: ProjectCollection = new Map();
projectCollection.set(0, {
  id: 0,
  name: 'Setup GraphQL',
  tasks: [0, 1, 2],
});

const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  projects: z.number().array(),
});
export type UserType = z.infer<typeof UserSchema>;
type UserCollection = Map<UserType['id'], UserType>;

const userCollection: UserCollection = new Map();
userCollection.set(0, {
  firstName: 'Lourens',
  lastName: 'Kaufmann',
  id: 0,
  projects: [0],
});

@Injectable()
export class UserService {
  getByFirstName(firstName: string): UserType | undefined {
    userCollection.forEach((user) => {
      if (user.firstName === firstName) {
        return user;
      }
    });

    return undefined;
  }
  getAll(): UserType[] {
    return Array.from(userCollection.values());
  }

  getProjects(user: UserType): ProjectType[] {
    return user.projects.map((projectId) => projectCollection.get(projectId)!);
  }

  getTasks(project: ProjectType): TaskType[] {
    return project.tasks.map((id) => tasksCollection.get(id)!);
  }

  addUser({
    firstName,
    lastName,
  }: Pick<UserType, 'firstName' | 'lastName'>): UserType {
    const user: UserType = {
      firstName,
      lastName,
      id: Array.from(userCollection.keys()).at(-1)!,
      projects: [],
    };

    userCollection.set(user.id, user);

    return user;
  }
}
