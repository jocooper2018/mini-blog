import CreateCommentUseCase from './CreateComment/CreateCommentUseCase';
import DeleteCommentUseCase from './DeleteComment/DeleteCommentUseCase';
import GetManyCommentsUseCase from './GetManyComment/GetManyCommentUseCase';

type AvailableCommentUseCases =
  | CreateCommentUseCase
  | GetManyCommentsUseCase
  | DeleteCommentUseCase;

export default AvailableCommentUseCases;
