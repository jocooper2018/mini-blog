import './index.css';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { emailRegex } from '../../utils/regex';
import Input from '../../Components/Input';
import { User } from '../..';
import { useLogInMutation } from '../../graphql';
import { ApolloError } from '@apollo/client';

interface LoginProps {
  loggedUser: User | undefined;
  setLoggedUser: (value: User | undefined) => void;
}

export default function Login(props: LoginProps) {
  const [emailInputValue, setEmailInputValue] = useState<string>('');
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [fetchLogIn] = useLogInMutation();

  const login: () => Promise<void> = async (): Promise<void> => {
    setErrorMessage('');
    try {
      const queryResult = await fetchLogIn({
        variables: {
          logInDto: {
            email: emailInputValue,
            password: passwordInputValue,
          },
        },
      });
      if (!queryResult.data?.logIn) {
        return;
      }
      const loggedUser: User = queryResult.data?.logIn;
      props.setLoggedUser(loggedUser);
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.message === 'Incorrect login or password') {
          setErrorMessage('Email ou mot de passe incorrect');
          return;
        }
      }
      console.error(error);
    }
  };

  return props.loggedUser ? (
    <Navigate to="/" />
  ) : (
    <main className="login-page">
      <h1>Connexion</h1>
      <span>
        Vous n'avez pas encore de compte&nbsp;?{' '}
        <Link to={'/signup'}>Créez-en un&nbsp;!</Link>
      </span>
      <Input
        type="email"
        id="login-email-input"
        placeholder="Email"
        state={{
          inputValue: emailInputValue,
          setInputValue: setEmailInputValue,
        }}
      >
        Email
      </Input>
      <Input
        type="password"
        id="login-password-input"
        placeholder="Mot de passe"
        state={{
          inputValue: passwordInputValue,
          setInputValue: setPasswordInputValue,
        }}
      >
        Mot de passe
      </Input>
      <button
        type="button"
        onClick={login}
        disabled={
          !emailRegex.test(emailInputValue) || passwordInputValue.length < 8
        }
      >
        Se connecter
      </button>
      <div className="error-message">{errorMessage}</div>
    </main>
  );
}
