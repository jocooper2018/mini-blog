import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UseCase } from 'src';
import User from 'src/Api/Entities/User';
import { UserRepository } from 'src/Api/Repositories/UserRepository';

@Injectable()
export default class GetOneUserUseCase
  implements UseCase<Promise<User>, [id: number]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneById(id);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }
      throw error;
    }
  }
}
