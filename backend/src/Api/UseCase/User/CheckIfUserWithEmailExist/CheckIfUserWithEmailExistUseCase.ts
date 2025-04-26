import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../index';
import { UserRepository } from '../../../Repositories/UserRepository';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CheckIfUserWithEmailExistUseCase
  implements UseCase<Promise<boolean>, [email: string]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(email: string): Promise<boolean> {
    try {
      await this.userRepository.findOneByEmail(email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return false;
        }
      }
      throw error;
    }
    return true;
  }
}
