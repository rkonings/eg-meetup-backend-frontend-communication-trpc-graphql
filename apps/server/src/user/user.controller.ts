import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService, UserType } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
}
