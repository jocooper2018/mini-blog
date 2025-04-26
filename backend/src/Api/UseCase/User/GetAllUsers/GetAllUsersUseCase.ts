import { Injectable } from '@nestjs/common';
import { UseCase } from 'src';
import User from 'src/Api/Entities/User';
import { UserRepository } from 'src/Api/Repositories/UserRepository';

@Injectable()
export default class GetAllUsersUseCase
  implements UseCase<Promise<User[]>, []>
{
  constructor(private readonly userRepository: UserRepository) {}

  async handle(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
