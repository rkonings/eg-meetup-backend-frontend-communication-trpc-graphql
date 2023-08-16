import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type UserType = z.infer<typeof UserSchema>;

const users = new Map<UserType['firstName'], UserType>([
  ['Niels', { firstName: 'Niels', lastName: 'de Bruin' }],
]);

@Injectable()
export class UserService {
  getByFirstName(firstName: string): UserType | undefined {
    return users.get(firstName);
  }
  getAll(): UserType[] {
    return Array.from(users.values());
  }

  addUser(user: UserType) {
    users.set(user.firstName, user);
    return user;
  }
}
