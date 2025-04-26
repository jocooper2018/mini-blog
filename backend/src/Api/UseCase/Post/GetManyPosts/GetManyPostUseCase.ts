import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { UseCase } from 'src';
import { PostRepository } from 'src/Api/Repositories/PostRepository';

@Injectable()
export default class GetManyPostUseCase
  implements UseCase<Promise<Post[]>, [authorId?: number]>
{
  constructor(private readonly postRepository: PostRepository) {}

  async handle(authorId?: number): Promise<Post[]> {
    try {
      return await this.postRepository.findMany(authorId);
    } catch (error) {
      throw error;
    }
  }
}
