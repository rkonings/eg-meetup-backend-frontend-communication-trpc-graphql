import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

const GraphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',
  subscriptions: {
    'subscriptions-transport-ws': {
      path: '/graphql',
    },
  },
});

@Module({
  imports: [UserModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
