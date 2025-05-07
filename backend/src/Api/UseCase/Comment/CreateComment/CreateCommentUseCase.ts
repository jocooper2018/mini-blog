import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from 'src';
import Comment from 'src/Api/Entities/Comment';
import CreateCommentDto from './CreateCommentDto';
import CommentRepository from 'src/Api/Repositories/CommentRepository';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CreateCommentUseCase
  implements
    UseCase<
      Promise<Comment>,
      [session: Record<string, any>, dto: CreateCommentDto]
    >
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async handle(
    session: Record<string, any>,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to create a comment');
    }
    if (!createCommentDto) {
      throw new BadRequestException('The request body is undefined');
    }
    if (session.connectedUserId !== createCommentDto.authorId) {
      throw new ForbiddenException(
        "You can't create a comment as someone else",
      );
    }
    try {
      return this.commentRepository.create(createCommentDto);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'Missing field or incorrect field type provided',
        );
      }
      throw error;
    }
  }
}
