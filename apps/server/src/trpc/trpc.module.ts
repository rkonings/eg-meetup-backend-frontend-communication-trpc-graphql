import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { UserService } from '../user/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter, UserService],
})
export class TrpcModule {}
