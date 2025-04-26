import {
  BadRequestException,
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
    if (session.connectedUserId !== updateUserDto.id) {
      throw new UnauthorizedException('You must log in to update a user');
    }
    const updateUserDto2: UpdateUserDto = {
      id: updateUserDto.id,
      email: updateUserDto.email,
      username: updateUserDto.username,
      password: updateUserDto.password
        ? await bcrypt.hash(updateUserDto.password, 10)
        : undefined,
    };
    // if (updateUserDto.email) {
    //   updateUserDto2.email = updateUserDto.email;
    // }
    // if (updateUserDto.username) {
    //   updateUserDto2.username = updateUserDto.username;
    // }
    // if (updateUserDto.password) {
    //   updateUserDto2.password = await bcrypt.hash(updateUserDto.password, 10);
    // }
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
