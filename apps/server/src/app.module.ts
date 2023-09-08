import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ComplexityPlugin } from './plugins/complexity.plugin';

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
  controllers: [],
  providers: [ComplexityPlugin],
})
export class AppModule {}
