import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src';
import Comment from 'src/Api/Entities/Comment';
import CommentRepository from 'src/Api/Repositories/CommentRepository';
import UseCaseFactory from '../../UseCaseFactory';
import GetOnePostUseCase from '../../Post/GetOnePost/GetOnePostUseCase';

@Injectable()
export default class DeleteCommentUseCase
  implements
    UseCase<Promise<Comment>, [session: Record<string, any>, commentId: number]>
{
  constructor(
    private readonly commentRepository: CommentRepository,
    // private readonly useCaseFactory: UseCaseFactory,
  ) {}

  async handle(
    session: Record<string, any>,
    commentId: number,
  ): Promise<Comment> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to delete a comment');
    }
    try {
      const commentToDelete = await this.commentRepository.findOne(commentId);
      if (session.connectedUserId !== commentToDelete.authorId) {
        throw new ForbiddenException("You can't delete someone else comment");
      }
      return this.commentRepository.remove(commentId);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Comment with id ${commentId} not found`);
        }
      }
      throw error;
    }
  }
}
