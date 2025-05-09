import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src';
import Post from 'src/Api/Entities/Post';
import { PostRepository } from 'src/Api/Repositories/PostRepository';
import UseCaseFactory from '../../UseCaseFactory';
import GetOnePostUseCase from '../GetOnePost/GetOnePostUseCase';
import CommentRepository from 'src/Api/Repositories/CommentRepository';

@Injectable()
export default class DeletePostUseCase
  implements UseCase<Promise<Post>, [id: number, session: Record<string, any>]>
{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly useCaseFactory: UseCaseFactory,
  ) {}

  async handle(id: number, session: Record<string, any>): Promise<Post> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to delete a post');
    }
    const postToDelete = await (
      await this.useCaseFactory.create(GetOnePostUseCase)
    ).handle(id);
    if (session.connectedUserId !== postToDelete.authorId) {
      throw new ForbiddenException("You can't delete someone else post");
    }
    try {
      await this.commentRepository.removeMany(id, undefined);
      return await this.postRepository.remove(id);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
      }
      throw error;
    }
  }
}
