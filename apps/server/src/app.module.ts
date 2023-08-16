import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { UserService } from './user/user.service';

@Module({
  imports: [TrpcModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
