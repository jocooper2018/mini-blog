import './index.css';
import { JSX, useState } from 'react';
import Input from '../Input';
import { User } from '../..';
import { Link } from 'react-router-dom';
import { useCreateCommentMutation } from '../../graphql';

interface CreateCommentProps {
  loggedUser: User | undefined;
  postId: number;
}

export default function CreateComment(props: CreateCommentProps): JSX.Element {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [commentTitleInputValue, setCommentTitleInputValue] =
    useState<string>('');
  const [commentContentInputValue, setCommentContentInputValue] =
    useState<string>('');

  const [fetchCreateComment] = useCreateCommentMutation();

  const handleCreateComment = async (): Promise<void> => {
    if (!props.loggedUser) return;
    console.log(
      `Titre : ${commentTitleInputValue}, Commentaire : ${commentContentInputValue}`,
    );
    const queryResult = await fetchCreateComment({
      variables: {
        createCommentDto: {
          authorId: props.loggedUser.id,
          postId: props.postId,
          title: commentTitleInputValue,
          content: commentContentInputValue,
        },
      },
    });
    if (!queryResult.data?.createComment) {
      console.error('Error when creating comment');
      return;
    }
    setCommentTitleInputValue('');
    setCommentContentInputValue('');
    setIsEditorOpen(false);
  };

  return (
    <div className="create-comment">
      {props.loggedUser ? (
        isEditorOpen ? (
          <form>
            <Input
              id="cerate-comment-title"
              type="text"
              state={{
                inputValue: commentTitleInputValue,
                setInputValue: setCommentTitleInputValue,
              }}
              required
            >
              Titre
            </Input>
            <Input
              id="cerate-comment-content"
              type="textarea"
              state={{
                inputValue: commentContentInputValue,
                setInputValue: setCommentContentInputValue,
              }}
              required
            >
              Commentaire
            </Input>
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsEditorOpen(false);
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleCreateComment}
                disabled={
                  commentTitleInputValue === '' ||
                  commentContentInputValue === ''
                }
              >
                Ajouter un commentaire
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsEditorOpen(true);
            }}
          >
            Ajouter un commentaire
          </button>
        )
      ) : (
        <Link to="/login" className="button">
          Connectez-vous pour commenter
        </Link>
      )}
    </div>
  );
}
