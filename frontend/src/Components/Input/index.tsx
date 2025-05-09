import { ReactNode } from 'react';
import './index.css';

interface InputProps {
  type?: 'email' | 'password' | 'text' | 'textarea';
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  state?: {
    inputValue: any;
    setInputValue: (value: any) => any;
  };
  children: ReactNode;
  errorChecker?: () => void;
}

export default function Input(props: InputProps) {
  return (
    <label htmlFor={props.id} className={`input${props.error ? ' error' : ''}`}>
      <span>{props.children}</span>
      {props.error ? (
        <span className="error-message">{props.error}</span>
      ) : (
        <></>
      )}
      {props.type === 'textarea' ? (
        <textarea
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          required={props.required}
          value={props.state ? props.state.inputValue : undefined}
          onChange={
            props.state
              ? (event) => props.state?.setInputValue(event.target.value)
              : undefined
          }
          onBlur={props.errorChecker}
        />
      ) : (
        <input
          type={props.type ? props.type : 'text'}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          required={props.required}
          value={props.state ? props.state.inputValue : undefined}
          onChange={
            props.state
              ? (event) => props.state?.setInputValue(event.target.value)
              : undefined
          }
          onBlur={props.errorChecker}
        />
      )}
    </label>
  );
}
