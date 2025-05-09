import './index.css';
import { JSX } from 'react';
import Input from '../Input';

interface CommentEditorProps {
  readonly commentTitleInputValue: string;
  readonly setCommentTitleInputValue: React.Dispatch<
    React.SetStateAction<string>
  >;
  readonly commentContentInputValue: string;
  readonly setCommentContentInputValue: React.Dispatch<
    React.SetStateAction<string>
  >;
  readonly confirmText: string;
  readonly confirmAction: () => Promise<void> | void;
  readonly cancelText?: string;
  readonly cancelAction: () => Promise<void> | void;
}

export default function CommentEditor(props: CommentEditorProps): JSX.Element {
  return (
    <form className="comment-editor">
      <Input
        id="cerate-comment-title"
        type="text"
        state={{
          inputValue: props.commentTitleInputValue,
          setInputValue: props.setCommentTitleInputValue,
        }}
        required
      >
        Titre
      </Input>
      <Input
        id="cerate-comment-content"
        type="textarea"
        state={{
          inputValue: props.commentContentInputValue,
          setInputValue: props.setCommentContentInputValue,
        }}
        required
      >
        Commentaire
      </Input>
      <div>
        <button
          type="button"
          onClick={() => {
            props.cancelAction();
          }}
        >
          {props.cancelText ?? 'Annuler'}
        </button>
        <button
          type="button"
          onClick={props.confirmAction}
          disabled={
            props.commentTitleInputValue === '' ||
            props.commentContentInputValue === ''
          }
        >
          {props.confirmText}
        </button>
      </div>
    </form>
  );
}
