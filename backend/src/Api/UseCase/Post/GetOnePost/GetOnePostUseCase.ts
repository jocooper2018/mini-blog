import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src';
import Post from 'src/Api/Entities/Post';
import { PostRepository } from 'src/Api/Repositories/PostRepository';

@Injectable()
export default class GetOnePostUseCase
  implements UseCase<Promise<Post>, [id: number]>
{
  constructor(private readonly postRepository: PostRepository) {}

  async handle(id: number): Promise<Post> {
    try {
      return await this.postRepository.findOne(id);
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
