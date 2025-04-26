import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UseCase } from 'src';
import User from 'src/Api/Entities/User';
import { UserRepository } from 'src/Api/Repositories/UserRepository';
import LogInDto from './LoginDto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class LogInUseCase
  implements
    UseCase<Promise<User>, [dto: LogInDto, session: Record<string, any>]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    logInDto: LogInDto,
    session: Record<string, any>,
  ): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneByEmail(
        logInDto.email,
      );
      if (!(await bcrypt.compare(logInDto.password, user.password))) {
        throw new UnauthorizedException('Incorrect login or password');
      }
      session.connectedUserId = user.id;
      return user;
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException('Incorrect login or password');
        }
      }
      throw error;
    }
  }
}
