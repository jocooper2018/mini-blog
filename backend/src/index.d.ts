import { Request, Response } from 'express';

export interface HandlerService<Return, Parameters> {
  handle: (...params: Parameters) => Return;
}

export type UseCase<Return, Parameters> = HandlerService<
  Return,
  [...Parameters]
>;

export interface GraphQLContext {
  req: Request & { session: Record<string, any> };
  res: Response;
}
