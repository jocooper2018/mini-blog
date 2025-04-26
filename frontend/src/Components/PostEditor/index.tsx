import './index.css';
import Input from '../Input';

interface PostEditorProps {
  type: 'create' | 'update';
  postTitle: string;
  setPostTitle: (value: string) => void;
  postContent: string;
  setPostContent: (value: string) => void;
  handleSubmit: () => void;
}

export default function PostEditor(props: PostEditorProps) {
  return (
    <form className='post-editor'>
      <Input
        type="text"
        id="post-title-input"
        state={{
          inputValue: props.postTitle,
          setInputValue: props.setPostTitle,
        }}
      >
        Titre
      </Input>
      <label htmlFor="post-content-input">
        <span>Texte</span>
        <textarea
          name="post-content-input"
          id="post-content-input"
          value={props.postContent}
          onChange={(event) => props.setPostContent(event.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={props.handleSubmit}
        disabled={props.postTitle === '' || props.postContent === ''}
      >
        {props.type === 'create' ? 'Créer un post' : 'Modifier le post'}
      </button>
    </form>
  );
}
