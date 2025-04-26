import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from 'src';
import { UpdatePostDto } from './UpdatePostDto';
import { Prisma } from '@prisma/client';
import { PostRepository } from 'src/Api/Repositories/PostRepository';
import Post from 'src/Api/Entities/Post';

@Injectable()
export default class UpdatePostUseCase
  implements
    UseCase<Promise<Post>, [dto: UpdatePostDto, session: Record<string, any>]>
{
  constructor(private readonly postRepository: PostRepository) {}

  async handle(
    updatePostDto: UpdatePostDto,
    session: Record<string, any>,
  ): Promise<Post> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to update a post');
    }
    try {
      const postToUpdate: Post = await this.postRepository.findOne(
        updatePostDto.id,
      );
      if (session.connectedUserId !== postToUpdate.authorId) {
        throw new ForbiddenException("You can't update a post of someone else");
      }
      return await this.postRepository.update(updatePostDto.id, updatePostDto);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Post with id ${updatePostDto.id} not found`,
          );
        }
      }
      throw error;
    }
  }
}
