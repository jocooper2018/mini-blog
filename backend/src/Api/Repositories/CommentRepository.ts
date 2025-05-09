import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import CreateCommentDto from '../UseCase/Comment/CreateComment/CreateCommentDto';
import Comment from '../Entities/Comment';
import UpdateCommentDto from '../UseCase/Comment/UpdateComment/UpdateCommentDto';

@Injectable()
export default class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  async findOne(id: number) {
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

  async update(updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.prisma.comment.update({
      data: {
        title: updateCommentDto.title,
        content: updateCommentDto.content,
        updatedAt: new Date(),
      },
      where: { id: updateCommentDto.id },
    });
  }

  async remove(commentId: number): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id: commentId } });
  }
}
