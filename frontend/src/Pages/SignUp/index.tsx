import './index.css';
import { Link, Navigate } from 'react-router-dom';
import Input from '../../Components/Input';
import { useState } from 'react';
import { emailRegex } from '../../utils/regex';
import { User } from '../..';
import { useCheckIfUserWithEmailExistLazyQuery, useCreateUserMutation } from '../../graphql';

interface SignUpProps {
  loggedUser: User | undefined;
  setLoggedUser: (user: User | undefined) => void;
}

interface ErrorMessages {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

export default function SignUp(props: SignUpProps) {
  const [emailInputValue, setEmailInputValue] = useState<string>('');
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState<string>('');
  const [usernameInputValue, setUsernameInputValue] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const [fetchSignUp] = useCreateUserMutation();
  const [checkIfUserWithEmailExist] = useCheckIfUserWithEmailExistLazyQuery();

  const checkEmail: (errorMessagesTmp: ErrorMessages) => Promise<ErrorMessages> = async (errorMessagesTmp: ErrorMessages): Promise<ErrorMessages> => {
    if (emailInputValue.length === 0)
      errorMessagesTmp.email = 'Veuillez renseigner ce champ';
    else if (!emailRegex.test(emailInputValue))
      errorMessagesTmp.email = 'Veuillez entrer un email valide';
    else {
      const emailExistQueryResult = await checkIfUserWithEmailExist({ variables: { email: emailInputValue } });
      if (emailExistQueryResult.data?.checkIfUserWithEmailExist)
        errorMessagesTmp.email = 'Un utilisateur avec cet email existe déjà';
    }
    return errorMessagesTmp;
  };

  const checkPassword: (errorMessagesTmp: ErrorMessages) => ErrorMessages = (errorMessagesTmp: ErrorMessages): ErrorMessages => {
    if (passwordInputValue.length === 0)
      errorMessagesTmp.password = 'Veuillez renseigner ce champ';
    else if (passwordInputValue.length < 8)
      errorMessagesTmp.password = 'Le mot de passe doit contenir au moins 8 caractères';
    else if (passwordInputValue.length > 50)
      errorMessagesTmp.password = 'Le mot de passe ne peut pas contenir plus de 50 caractères';
    return errorMessagesTmp;
  };

  const checkConfirmPassword: (errorMessagesTmp: ErrorMessages) => ErrorMessages = (errorMessagesTmp: ErrorMessages): ErrorMessages => {
    if (confirmPasswordInputValue.length === 0)
      errorMessagesTmp.confirmPassword = 'Veuillez renseigner ce champ';
    else if (passwordInputValue !== confirmPasswordInputValue)
      errorMessagesTmp.confirmPassword = 'Les mots de passes sont différents';
    return errorMessagesTmp;
  };

  const checkUsername: (errorMessagesTmp: ErrorMessages) => ErrorMessages = (errorMessagesTmp: ErrorMessages): ErrorMessages => {
    if (usernameInputValue.length === 0)
      errorMessagesTmp.username = 'Veuillez renseigner ce champ';
    else if (usernameInputValue.length < 3)
      errorMessagesTmp.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    return errorMessagesTmp;
  };

  const checkForErrors: () => Promise<boolean> = async (): Promise<boolean> => {
    let errorMessagesTmp: ErrorMessages = {};
    errorMessagesTmp = await checkEmail(errorMessagesTmp);
    errorMessagesTmp = checkPassword(errorMessagesTmp);
    errorMessagesTmp = checkConfirmPassword(errorMessagesTmp);
    errorMessagesTmp = checkUsername(errorMessagesTmp);
    setErrorMessages(errorMessagesTmp);
    return !errorMessagesTmp.email &&
      !errorMessagesTmp.password &&
      !errorMessagesTmp.confirmPassword &&
      !errorMessagesTmp.username;
  };

  const handleSignup: () => Promise<void> = async (): Promise<void> => {
    if (!await checkForErrors()) return;
    const queryResponse = await fetchSignUp({
      variables: {
        createUserDto: {
          email: emailInputValue,
          password: passwordInputValue,
          username: usernameInputValue,
        },
      },
    });
    if (!queryResponse.data?.createUser) return;
    const userCreated: User = queryResponse.data.createUser;
    props.setLoggedUser(userCreated);
  };

  return props.loggedUser ? <Navigate to={`/user/${props.loggedUser.id}`} /> : (
    <main className="signup-page">
      <h1>Créer un compte</h1>
      <span>
        Vous avez déjà un compte&nbsp;? <Link to="/login">Se connecter</Link>
      </span>
      <Input
        id="email-input"
        type="email"
        placeholder="Votre adresse email"
        state={{
          inputValue: emailInputValue,
          setInputValue: setEmailInputValue,
        }}
        error={errorMessages.email}
      >
        Email
      </Input>
      <Input
        id="password-input"
        type="password"
        placeholder="Votre mot de passe"
        state={{
          inputValue: passwordInputValue,
          setInputValue: setPasswordInputValue,
        }}
        error={errorMessages.password}
      >
        Mot de passe
      </Input>
      <Input
        id="confirm-password-input"
        type="password"
        placeholder="Retapez le même mot de passe"
        state={{
          inputValue: confirmPasswordInputValue,
          setInputValue: setConfirmPasswordInputValue,
        }}
        error={errorMessages.confirmPassword}
      >
        Confirmez votre mot de passe
      </Input>
      <Input
        id="username-input"
        type="text"
        placeholder="Votre pseudo"
        state={{
          inputValue: usernameInputValue,
          setInputValue: setUsernameInputValue,
        }}
        error={errorMessages.username}
      >
        Nom d'utilisateur
      </Input>
      <button
        type="button"
        onClick={handleSignup}
        // disabled={
        //   !(
        //     emailRegex.test(emailInputValue) &&
        //     passwordInputValue.length >= 8 &&
        //     passwordInputValue.length <= 50 &&
        //     passwordInputValue === confirmPasswordInputValue &&
        //     usernameInputValue.length >= 3
        //   )
        // }
      >
        Créer un compte
      </button>
    </main>
  );
}
