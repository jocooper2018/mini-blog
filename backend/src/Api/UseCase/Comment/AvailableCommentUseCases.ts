import CreateCommentUseCase from './CreateComment/CreateCommentUseCase';
import DeleteCommentUseCase from './DeleteComment/DeleteCommentUseCase';
import GetManyCommentsUseCase from './GetManyComment/GetManyCommentUseCase';
import UpdateCommentUseCase from './UpdateComment/UpdateCommentUseCase';

type AvailableCommentUseCases =
  | CreateCommentUseCase
  | GetManyCommentsUseCase
  | UpdateCommentUseCase
  | DeleteCommentUseCase;

export default AvailableCommentUseCases;
