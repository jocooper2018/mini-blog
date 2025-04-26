import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UseCase } from 'src';
import { CreateUserDto } from './CreateUserDto';
import { UserRepository } from 'src/Api/Repositories/UserRepository';
import { Prisma } from '@prisma/client';
import User from 'src/Api/Entities/User';
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class CreateUserUseCase
  implements
    UseCase<Promise<User>, [dto: CreateUserDto, session: Record<string, any>]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    createUserDto: CreateUserDto,
    session: Record<string, any>,
  ): Promise<User> {
    if (!createUserDto) {
      throw new BadRequestException('The request body is undefined');
    }
    try {
      const user: User = await this.userRepository.create({
        email: createUserDto.email,
        username: createUserDto.username,
        password: await bcrypt.hash(createUserDto.password, 10),
      });
      session.connectedUserId = user.id;
      return user;
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Duplicate email');
        }
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'Missing field or incorrect field type provided',
        );
      }
      throw error;
    }
  }
}
