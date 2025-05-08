import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import Comment from '../Entities/Comment';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import { GraphQLContext } from 'src';
import CreateCommentDto from '../UseCase/Comment/CreateComment/CreateCommentDto';
import CreateCommentUseCase from '../UseCase/Comment/CreateComment/CreateCommentUseCase';
import GetManyCommentsUseCase from '../UseCase/Comment/GetManyComment/GetManyCommentUseCase';

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

  @Query(() => [Comment])
  async getManyComment(
    @Args('postId', { type: () => Int, nullable: true })
    postId?: number,
    @Args('authorId', { type: () => Int, nullable: true })
    authorId?: number,
  ): Promise<Comment[]> {
    return (await this.useCaseFactory.create(GetManyCommentsUseCase)).handle(
      postId,
      authorId,
    );
  }
}
