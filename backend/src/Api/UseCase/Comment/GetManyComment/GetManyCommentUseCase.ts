import { Injectable } from '@nestjs/common';
import { UseCase } from 'src';
import Comment from 'src/Api/Entities/Comment';
import CommentRepository from 'src/Api/Repositories/CommentRepository';

@Injectable()
export default class GetManyCommentsUseCase
  implements
    UseCase<
      Promise<Comment[]>,
      [postId: number | undefined, authorId: number | undefined]
    >
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async handle(
    postId: number | undefined,
    authorId: number | undefined,
  ): Promise<Comment[]> {
    try {
      return this.commentRepository.findMany(postId, authorId);
    } catch (error) {
      throw error;
    }
  }
}
