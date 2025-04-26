import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from 'src';
import { CreatePostDto } from './CreatePostDto';
import { PostRepository } from 'src/Api/Repositories/PostRepository';
import Post from 'src/Api/Entities/Post';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CreatePostUseCase
  implements
    UseCase<Promise<Post>, [dto: CreatePostDto, session: Record<string, any>]>
{
  constructor(private readonly postRepository: PostRepository) {}

  async handle(
    createPostDto: CreatePostDto,
    session: Record<string, any>,
  ): Promise<Post> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to create a post');
    }
    if (!createPostDto) {
      throw new BadRequestException('The request body is undefined');
    }
    if (session.connectedUserId !== createPostDto.authorId) {
      throw new ForbiddenException("You can't create a post as someone else");
    }
    try {
      return this.postRepository.create(createPostDto);
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
