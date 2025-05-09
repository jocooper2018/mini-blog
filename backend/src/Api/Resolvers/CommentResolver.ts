import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import Comment from '../Entities/Comment';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import { GraphQLContext } from 'src';
import CreateCommentDto from '../UseCase/Comment/CreateComment/CreateCommentDto';
import CreateCommentUseCase from '../UseCase/Comment/CreateComment/CreateCommentUseCase';
import GetManyCommentsUseCase from '../UseCase/Comment/GetManyComment/GetManyCommentUseCase';
import DeleteCommentUseCase from '../UseCase/Comment/DeleteComment/DeleteCommentUseCase';
import UpdateCommentDto from '../UseCase/Comment/UpdateComment/UpdateCommentDto';
import UpdateCommentUseCase from '../UseCase/Comment/UpdateComment/UpdateCommentUseCase';

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

  @Mutation(() => Comment)
  async updateComment(
    @Context() context: GraphQLContext,
    @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return (await this.useCaseFactory.create(UpdateCommentUseCase)).handle(
      context.req.session,
      updateCommentDto,
    );
  }

  @Mutation(() => Comment)
  async deleteComment(
    @Context() context: GraphQLContext,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Comment> {
    return (await this.useCaseFactory.create(DeleteCommentUseCase)).handle(
      context.req.session,
      id,
    );
  }
}
