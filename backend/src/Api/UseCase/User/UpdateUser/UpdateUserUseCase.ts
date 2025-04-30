import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from 'src';
import { UpdateUserDto } from './UpdateUserDto';
import { UserRepository } from 'src/Api/Repositories/UserRepository';
import User from 'src/Api/Entities/User';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { emailRegex } from 'src/Core/regex';

@Injectable()
export default class UpdateUserUseCase
  implements
    UseCase<Promise<User>, [UpdateUserDto, session: Record<string, any>]>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    updateUserDto: UpdateUserDto,
    session: Record<string, any>,
  ): Promise<User> {
    if (!updateUserDto) {
      throw new BadRequestException('The request body is undefined');
    }
    if (!session.connectedUserId) {
      throw new UnauthorizedException('You must log in to update a user');
    }
    if (session.connectedUserId !== updateUserDto.id) {
      throw new ForbiddenException("You can't update another user");
    }
    if (
      updateUserDto.password &&
      (updateUserDto.password.length < 8 || updateUserDto.password.length > 50)
    ) {
      throw new BadRequestException(
        'The password must be between 8 and 50 characters long.',
      );
    }
    if (updateUserDto.email && !emailRegex.test(updateUserDto.email)) {
      throw new BadRequestException('Invalid email');
    }
    if (updateUserDto.username && updateUserDto.username.length < 3) {
      throw new BadRequestException('The username must be at least 3 characters long')
    }
    const updateUserDto2: UpdateUserDto = {
      id: updateUserDto.id,
      email: updateUserDto.email,
      username: updateUserDto.username,
      password: updateUserDto.password
        ? await bcrypt.hash(updateUserDto.password, 10)
        : undefined,
    };
    try {
      return await this.userRepository.update(updateUserDto2);
    } catch (error) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `User with id ${updateUserDto.id} not found`,
          );
        }
      }
      throw error;
    }
  }
}
