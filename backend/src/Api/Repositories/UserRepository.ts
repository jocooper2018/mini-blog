import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../UseCase/User/CreateUser/CreateUserDto';
import { UpdateUserDto } from '../UseCase/User/UpdateUser/UpdateUserDto';
import { PrismaService } from 'src/PrismaService';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async userWithEmailExist(email: string): Promise<boolean> {
    return (await this.prisma.user.findMany({ where: { email } })).length > 0;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;
    return this.prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: updateUserDto.id },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        password: updateUserDto.password,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
