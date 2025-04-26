import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src';
import User from 'src/Api/Entities/User';
import UseCaseFactory from 'src/Api/UseCase/UseCaseFactory';
import GetOneUserUseCase from '../GetOneUser/GetOneUserUseCase';

@Injectable()
export default class GetLoggedUserUseCase
  implements UseCase<Promise<User>, [session: Record<string, any>]>
{
  constructor(
    private readonly useCaseFactory: UseCaseFactory,
  ) {}

  async handle(session: Record<string, any>): Promise<User> {
    const userId: number = session.connectedUserId;
    if (!userId || typeof userId !== 'number') {
      throw new NotFoundException('User not logged');
    }
    return (await this.useCaseFactory.create(GetOneUserUseCase)).handle(userId);
  }
}
