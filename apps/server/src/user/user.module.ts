import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { ProjectResolver } from 'src/user/project/project.resolver';
import { TaskResolver } from 'src/user/task/task.resolver';
import { UserService } from './user.service';
import { ProjectService } from 'src/user/project/project.service';
import { TaskService } from 'src/user/task/task.service';

@Module({
  providers: [
    UserResolver,
    ProjectResolver,
    TaskResolver,
    UserService,
    ProjectService,
    TaskService,
  ],
  controllers: [UserController],
})
export class UserModule {}
