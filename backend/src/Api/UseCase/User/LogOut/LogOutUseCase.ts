import { Injectable } from '@nestjs/common';
import { UseCase } from 'src';
import { Response } from 'express';

@Injectable()
export default class LogOutUseCase
  implements UseCase<Promise<any>, [session: Record<string, any>, Response]>
{
  async handle(
    session: Record<string, any>,
    response: Response,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      session.destroy((error: Error | null) => {
        if (error) reject(error);
        response.clearCookie('connect.sid');
        resolve(true);
      });
    });
  }
}
