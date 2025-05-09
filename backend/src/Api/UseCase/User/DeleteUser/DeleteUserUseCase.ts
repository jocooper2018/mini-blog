import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src';
import User from 'src/Api/Entities/User';
import { UserRepository } from 'src/Api/Repositories/UserRepository';
import UseCaseFactory from '../../UseCaseFactory';
import Post from 'src/Api/Entities/Post';
import GetManyPostUseCase from '../../Post/GetManyPosts/GetManyPostUseCase';
import DeletePostUseCase from '../../Post/DeletePost/DeletePostUseCase';
import LogOutUseCase from '../LogOut/LogOutUseCase';
import { Response } from 'express';
import CommentRepository from 'src/Api/Repositories/CommentRepository';

@Injectable()
export default class DeleteUserUseCase
  implements
    UseCase<Promise<User>, [id: number, session: Record<string, any>, Response]>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    private readonly useCaseFactory: UseCaseFactory,
  ) {}

  async handle(
    id: number,
    session: Record<string, any>,
    response: Response,
  ): Promise<User> {
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to delete a user');
    }
    if (session.connectedUserId !== id) {
      throw new ForbiddenException("You cannot delete another user's account");
    }
    const userPosts: Post[] = await (
      await this.useCaseFactory.create(GetManyPostUseCase)
    ).handle(id);
    for (const post of userPosts) {
      await (
        await this.useCaseFactory.create(DeletePostUseCase)
      ).handle(post.id, session);
    }
    await (
      await this.useCaseFactory.create(LogOutUseCase)
    ).handle(session, response);
    try {
      await this.commentRepository.removeMany(undefined, id);
      return await this.userRepository.remove(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }
      throw error;
    }
  }
}
