import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from 'src';
import Comment from 'src/Api/Entities/Comment';
import CommentRepository from 'src/Api/Repositories/CommentRepository';
import UpdateCommentDto from './UpdateCommentDto';
import { Prisma } from '@prisma/client';

@Injectable()
export default class UpdateCommentUseCase
  implements
    UseCase<Promise<Comment>, [session: Record<string, any>, UpdateCommentDto]>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async handle(
    session: Record<string, any>,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to update a comment');
    }
    try {
      const commentToUpdate: Comment = await this.commentRepository.findOne(
        updateCommentDto.id,
      );
      if (session.connectedUserId !== commentToUpdate.authorId) {
        throw new ForbiddenException("You can't update someone else comment");
      }
      return this.commentRepository.update(updateCommentDto);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Comment with id ${updateCommentDto.id} not found`,
          );
        }
      }
      throw error;
    }
  }
}
