import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ProjectResolver, UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver, ProjectResolver],
})
export class UserModule {}
