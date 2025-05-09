import { Injectable } from '@nestjs/common';
import ServiceFactory from 'src/ServiceFactory';
import CreateUserUseCase from './User/CreateUser/CreateUserUseCase';
import UpdateUserUseCase from './User/UpdateUser/UpdateUserUseCase';
import GetAllUsersUseCase from './User/GetAllUsers/GetAllUsersUseCase';
import GetOneUserUseCase from './User/GetOneUser/GetOneUserUseCase';
import DeleteUserUseCase from './User/DeleteUser/DeleteUserUseCase';
import CreatePostUseCase from './Post/CreatePost/CreatePostUseCase';
import GetManyPostUseCase from './Post/GetManyPosts/GetManyPostUseCase';
import GetOnePostUseCase from './Post/GetOnePost/GetOnePostUseCase';
import UpdatePostUseCase from './Post/UpdatePost/UpdatePostUseCase';
import DeletePostUseCase from './Post/DeletePost/DeletePostUseCase';
import LogInUseCase from './User/LogIn/LogInUseCase';
import GetLoggedUserUseCase from './User/GetLoggedUser/GetLoggedUserUseCase';
import LogOutUseCase from './User/LogOut/LogOutUseCase';
import CheckIfUserWithEmailExistUseCase from './User/CheckIfUserWithEmailExist/CheckIfUserWithEmailExistUseCase';
import AvailableCommentUseCases from './Comment/AvailableCommentUseCases';

type UseCases =
  | CreateUserUseCase
  | UpdateUserUseCase
  | GetAllUsersUseCase
  | GetOneUserUseCase
  | CheckIfUserWithEmailExistUseCase
  | DeleteUserUseCase
  | LogInUseCase
  | LogOutUseCase
  | GetLoggedUserUseCase
  | CreatePostUseCase
  | GetManyPostUseCase
  | GetOnePostUseCase
  | UpdatePostUseCase
  | DeletePostUseCase
  | AvailableCommentUseCases;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
