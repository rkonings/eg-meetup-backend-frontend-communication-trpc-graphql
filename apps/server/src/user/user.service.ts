import { Injectable } from '@nestjs/common';
import { ProjectType } from 'src/user/project/project.service';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  projects: z.number().array(),
});
export type UserType = z.infer<typeof UserSchema>;
type UserCollection = Map<UserType['id'], UserType>;

export const userCollection: UserCollection = new Map();
userCollection.set(0, {
  firstName: 'Lourens',
  lastName: 'Kaufmann',
  id: 0,
  projects: [0],
});

userCollection.set(1, {
  firstName: 'Niels',
  lastName: 'de Bruin',
  id: 1,
  projects: [0],
});

@Injectable()
export class UserService {
  getById(id: number): UserType | undefined {
    return userCollection.get(id);
  }

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

  getUsers(project: ProjectType): UserType[] {
    return project.users.map((id) => userCollection.get(id)!);
  }

  addUser({
    firstName,
    lastName,
  }: Pick<UserType, 'firstName' | 'lastName'>): UserType {
    const user: UserType = {
      firstName,
      lastName,
      id: Array.from(userCollection.values()).length,
      projects: [],
    };

    userCollection.set(user.id, user);

    return user;
  }
}
