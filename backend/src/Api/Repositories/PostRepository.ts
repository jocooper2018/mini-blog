import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../UseCase/Post/CreatePost/CreatePostDto';
import { UpdatePostDto } from '../UseCase/Post/UpdatePost/UpdatePostDto';
import { PrismaService } from 'src/PrismaService';
import { Post } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findMany(authorId?: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { authorId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.post.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        published: updatePostDto.published,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number): Promise<Post> {
    return await this.prisma.post.delete({
      where: { id },
    });
  }
}
