import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import Comment from '../Entities/Comment';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import { GraphQLContext } from 'src';
import CreateCommentDto from '../UseCase/Comment/CreateComment/CreateCommentDto';
import CreateCommentUseCase from '../UseCase/Comment/CreateComment/CreateCommentUseCase';

@Resolver(Comment)
export default class CommentResolver {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Mutation(() => Comment)
  async createComment(
    @Context() context: GraphQLContext,
    @Args('createCommentDto') createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return (await this.useCaseFactory.create(CreateCommentUseCase)).handle(
      context.req.session,
      createCommentDto,
    );
  }
}
