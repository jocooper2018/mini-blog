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

@Injectable()
export default class DeletePostUseCase
  implements UseCase<Promise<Post>, [id: number, session: Record<string, any>]>
{
  constructor(private readonly postRepository: PostRepository) {}

  async handle(id: number, session: Record<string, any>): Promise<Post> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to delete a post');
    }
    if (session.connectedUserId !== id) {
      throw new ForbiddenException("You can't delete someone else post");
    }
    try {
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
