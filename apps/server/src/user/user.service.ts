import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type UserType = z.infer<typeof UserSchema>;

const users = new Map<UserType['firstName'], UserType>([
  ['Laurens', { firstName: 'Lourens', lastName: 'Kaufmann' }],
]);

@Injectable()
export class UserService {
  getByFirstName(firstName: string): UserType | undefined {
    return users.get(firstName);
  }
  getAll(): UserType[] {
    return Array.from(users.values());
  }
}
