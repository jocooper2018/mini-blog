import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from 'src';
import User from '../Entities/User';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import { CreateUserDto } from '../UseCase/User/CreateUser/CreateUserDto';
import CreateUserUseCase from '../UseCase/User/CreateUser/CreateUserUseCase';
import DeleteUserUseCase from '../UseCase/User/DeleteUser/DeleteUserUseCase';
import GetAllUsersUseCase from '../UseCase/User/GetAllUsers/GetAllUsersUseCase';
import GetLoggedUserUseCase from '../UseCase/User/GetLoggedUser/GetLoggedUserUseCase';
import GetOneUserUseCase from '../UseCase/User/GetOneUser/GetOneUserUseCase';
import LogInDto from '../UseCase/User/LogIn/LoginDto';
import LogInUseCase from '../UseCase/User/LogIn/LogInUseCase';
import LogOutUseCase from '../UseCase/User/LogOut/LogOutUseCase';
import { UpdateUserDto } from '../UseCase/User/UpdateUser/UpdateUserDto';
import UpdateUserUseCase from '../UseCase/User/UpdateUser/UpdateUserUseCase';
import CheckIfUserWithEmailExistUseCase from '../UseCase/User/CheckIfUserWithEmailExist/CheckIfUserWithEmailExistUseCase';

@Resolver(User)
export default class UserResolver {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
    @Context() context: GraphQLContext,
  ): Promise<User> {
    return (await this.useCaseFactory.create(CreateUserUseCase)).handle(
      createUserDto,
      context.req.session,
    );
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return (await this.useCaseFactory.create(GetAllUsersUseCase)).handle();
  }

  @Query(() => User)
  async getOneUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return (await this.useCaseFactory.create(GetOneUserUseCase)).handle(id);
  }

  @Query(() => User)
  async getLoggedUser(@Context() context: GraphQLContext): Promise<User> {
    return (await this.useCaseFactory.create(GetLoggedUserUseCase)).handle(
      context.req.session,
    );
  }

  @Query(() => Boolean)
  async checkIfUserWithEmailExist(
    @Args('email') email: string,
  ): Promise<boolean> {
    return (
      await this.useCaseFactory.create(CheckIfUserWithEmailExistUseCase)
    ).handle(email);
  }

  @Mutation(() => User)
  async logIn(
    @Args('logInDto', { type: () => LogInDto }) logInDto: LogInDto,
    @Context() context: GraphQLContext,
  ): Promise<User> {
    return (await this.useCaseFactory.create(LogInUseCase)).handle(
      logInDto,
      context.req.session,
    );
  }

  @Mutation(() => Boolean)
  async logOut(@Context() context: GraphQLContext): Promise<boolean> {
    return (await this.useCaseFactory.create(LogOutUseCase)).handle(
      context.req.session,
      context.res,
    );
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserDto', { type: () => UpdateUserDto })
    updateUserDto: UpdateUserDto,
    @Context() context: GraphQLContext,
  ): Promise<User> {
    return (await this.useCaseFactory.create(UpdateUserUseCase)).handle(
      updateUserDto,
      context.req.session,
    );
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: GraphQLContext,
  ): Promise<User> {
    return (await this.useCaseFactory.create(DeleteUserUseCase)).handle(
      id,
      context.req.session,
      context.res,
    );
  }
}
