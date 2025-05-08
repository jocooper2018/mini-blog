import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import CreateCommentDto from '../UseCase/Comment/CreateComment/CreateCommentDto';
import Comment from '../Entities/Comment';

@Injectable()
export default class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  async findOne(id) {
    return this.prisma.comment.findUniqueOrThrow({ where: { id: id } });
  }

  async findMany(
    postId: number | undefined,
    authorId: number | undefined,
  ): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        postId: postId,
        authorId: authorId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(commentId: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id: commentId } });
  }
}
