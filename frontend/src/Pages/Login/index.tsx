import './index.css';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { emailRegex } from '../../utils/regex';
import Input from '../../Components/Input';
import { User } from '../..';
import { useLogInMutation } from '../../graphql';

interface LoginProps {
  loggedUser: User | undefined;
  setLoggedUser: (value: User | undefined) => void;
}

export default function Login(props: LoginProps) {

  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');

  const [fetchLogIn] = useLogInMutation();

  const login: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await fetchLogIn({
      variables: {
        logInDto: {
          email: emailInputValue,
          password: passwordInputValue,
        },
      },
    });
    if (!queryResult.data?.logIn) {
      return ;
    }
    const loggedUser: User = queryResult.data?.logIn;
    props.setLoggedUser(loggedUser);
  };

  return props.loggedUser ?
    <Navigate to="/" /> :
    (
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
      </main>
    );
}
