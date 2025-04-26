import { Module } from '@nestjs/common';
import { UserRepository } from './Api/Repositories/UserRepository';
import UseCaseFactory from './Api/UseCase/UseCaseFactory';
import { PostRepository } from './Api/Repositories/PostRepository';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { DirectiveLocation, GraphQLDirective } from 'graphql';
import UserResolver from './Api/Resolvers/UserResolver';
import { PrismaService } from './PrismaService';
import PostResolver from './Api/Resolvers/PostResolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION],
      //     }),
      //   ],
      // },
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  // controllers: [UsersController, PostController],
  providers: [
    PrismaService,
    UseCaseFactory,
    UserRepository,
    PostRepository,
    UserResolver,
    PostResolver,
  ],
})
export class AppModule {}
