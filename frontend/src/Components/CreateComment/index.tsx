import './index.css';
import { JSX, useState } from 'react';
import { User } from '../..';
import { Link } from 'react-router-dom';
import { useCreateCommentMutation } from '../../graphql';
import { gql, Reference } from '@apollo/client';
import CommentEditor from '../CommentEditor';

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

  const [fetchCreateComment] = useCreateCommentMutation({
    update(cache, { data }) {
      if (!data?.createComment) return;
      const newCommentRef = cache.writeFragment({
        data: data.createComment,
        fragment: gql`
          fragment NewComment on Comment {
            id
            postId
            authorId
            title
            content
            createdAt
            updatedAt
          }
        `,
      });
      if (!newCommentRef) return;
      cache.modify({
        fields: {
          getManyComment(existingComments: readonly Reference[] = []) {
            return [newCommentRef, ...existingComments];
          },
        },
      });
    },
  });

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
          <CommentEditor
            commentTitleInputValue={commentTitleInputValue}
            setCommentTitleInputValue={setCommentTitleInputValue}
            commentContentInputValue={commentContentInputValue}
            setCommentContentInputValue={setCommentContentInputValue}
            confirmText="Ajouter un commentaire"
            confirmAction={handleCreateComment}
            cancelAction={() => setIsEditorOpen(false)}
          />
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
