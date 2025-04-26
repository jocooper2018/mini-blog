import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src';
import Post from '../Entities/Post';
import { CreatePostDto } from '../UseCase/Post/CreatePost/CreatePostDto';
import CreatePostUseCase from '../UseCase/Post/CreatePost/CreatePostUseCase';
import DeletePostUseCase from '../UseCase/Post/DeletePost/DeletePostUseCase';
import GetManyPostUseCase from '../UseCase/Post/GetManyPosts/GetManyPostUseCase';
import GetOnePostUseCase from '../UseCase/Post/GetOnePost/GetOnePostUseCase';
import { UpdatePostDto } from '../UseCase/Post/UpdatePost/UpdatePostDto';
import UpdatePostUseCase from '../UseCase/Post/UpdatePost/UpdatePostUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Resolver(Post)
export default class PostResolver {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
    @Context() context: GraphQLContext,
  ): Promise<Post> {
    return (await this.useCaseFactory.create(CreatePostUseCase)).handle(
      createPostDto,
      context.req.session,
    );
  }

  @Query(() => [Post])
  async getManyPost(
    @Args('authorId', { type: () => Int, nullable: true }) authorId?: number,
  ): Promise<Post[]> {
    return (await this.useCaseFactory.create(GetManyPostUseCase)).handle(
      authorId,
    );
  }

  @Query(() => Post)
  async getOnePostById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Post> {
    return (await this.useCaseFactory.create(GetOnePostUseCase)).handle(id);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostDto') updatePostDto: UpdatePostDto,
    @Context() context: GraphQLContext,
  ): Promise<Post> {
    return (await this.useCaseFactory.create(UpdatePostUseCase)).handle(
      updatePostDto,
      context.req.session,
    );
  }

  @Mutation(() => Post)
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: GraphQLContext,
  ): Promise<Post> {
    return (await this.useCaseFactory.create(DeletePostUseCase)).handle(
      id,
      context.req.session,
    );
  }
}
