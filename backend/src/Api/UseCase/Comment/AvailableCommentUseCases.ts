import CreateCommentUseCase from './CreateComment/CreateCommentUseCase';
import GetManyCommentsUseCase from './GetManyComment/GetManyCommentUseCase';

type AvailableCommentUseCases =
  | CreateCommentUseCase
  | GetManyCommentsUseCase;

export default AvailableCommentUseCases;
