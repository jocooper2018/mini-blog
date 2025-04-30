import './index.css';
import Input from '../Input';
import { useState } from 'react';
import { emailRegex } from '../../utils/regex';
import {
  useCheckIfUserWithEmailExistLazyQuery,
  User,
} from '../../graphql/generated';

interface UserDataFormProps {
  setLoggedUser: (value: User) => void;
  handleSubmit: (userData: {
    email: string;
    username: string;
    password: string;
  }) => Promise<boolean>;
  requiredFields?: { email?: boolean; username?: boolean; password?: boolean };
  defaultValues?: { email?: string; username?: string };
  submitMessage: string;
}

interface ErrorMessages {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

export default function UserDataForm(props: UserDataFormProps) {
  const [emailInputValue, setEmailInputValue] = useState<string>(
    props.defaultValues?.email ?? '',
  );
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState<string>('');
  const [usernameInputValue, setUsernameInputValue] = useState<string>(
    props.defaultValues?.username ?? '',
  );
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const [checkIfUserWithEmailExist] = useCheckIfUserWithEmailExistLazyQuery();

  const checkEmail: (
    errorMessagesTmp: ErrorMessages,
  ) => Promise<ErrorMessages> = async (
    errorMessagesTmp: ErrorMessages,
  ): Promise<ErrorMessages> => {
    if (emailInputValue.length === 0) {
      if (props.requiredFields?.email) {
        errorMessagesTmp.email = 'Veuillez renseigner ce champ';
      }
    } else if (!emailRegex.test(emailInputValue)) {
      errorMessagesTmp.email = 'Veuillez entrer un email valide';
    } else {
      if (emailInputValue !== props.defaultValues?.email) {
        const emailExistQueryResult = await checkIfUserWithEmailExist({
          variables: { email: emailInputValue },
        });
        if (emailExistQueryResult.data?.checkIfUserWithEmailExist) {
          errorMessagesTmp.email = 'Un utilisateur avec cet email existe déjà';
        }
      }
    }
    return errorMessagesTmp;
  };

  const checkPassword: (errorMessagesTmp: ErrorMessages) => ErrorMessages = (
    errorMessagesTmp: ErrorMessages,
  ): ErrorMessages => {
    if (passwordInputValue.length === 0) {
      if (props.requiredFields?.password) {
        errorMessagesTmp.password = 'Veuillez renseigner ce champ';
      }
    } else if (passwordInputValue.length < 8) {
      errorMessagesTmp.password =
        'Le mot de passe doit contenir au moins 8 caractères';
    } else if (passwordInputValue.length > 50) {
      errorMessagesTmp.password =
        'Le mot de passe ne peut pas contenir plus de 50 caractères';
    }
    return errorMessagesTmp;
  };

  const checkConfirmPassword: (
    errorMessagesTmp: ErrorMessages,
  ) => ErrorMessages = (errorMessagesTmp: ErrorMessages): ErrorMessages => {
    if (passwordInputValue !== confirmPasswordInputValue) {
      errorMessagesTmp.confirmPassword = 'Les mots de passes sont différents';
    }
    return errorMessagesTmp;
  };

  const checkUsername: (errorMessagesTmp: ErrorMessages) => ErrorMessages = (
    errorMessagesTmp: ErrorMessages,
  ): ErrorMessages => {
    if (usernameInputValue.length === 0) {
      if (props.requiredFields?.username) {
        errorMessagesTmp.username = 'Veuillez renseigner ce champ';
      }
    } else if (usernameInputValue.length < 3) {
      errorMessagesTmp.username =
        "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }
    return errorMessagesTmp;
  };

  const checkForErrors: () => Promise<boolean> = async (): Promise<boolean> => {
    let errorMessagesTmp: ErrorMessages = {};
    errorMessagesTmp = await checkEmail(errorMessagesTmp);
    errorMessagesTmp = checkPassword(errorMessagesTmp);
    errorMessagesTmp = checkConfirmPassword(errorMessagesTmp);
    errorMessagesTmp = checkUsername(errorMessagesTmp);
    setErrorMessages(errorMessagesTmp);
    return (
      !errorMessagesTmp.email &&
      !errorMessagesTmp.password &&
      !errorMessagesTmp.confirmPassword &&
      !errorMessagesTmp.username
    );
  };

  const handleSubmit: () => Promise<void> = async (): Promise<void> => {
    if (!(await checkForErrors())) return;
    if (
      await props.handleSubmit({
        email: emailInputValue,
        username: usernameInputValue,
        password: passwordInputValue,
      })
    ) {
      alert('Succès');
    } else {
      alert("Une erreur s'est produite");
    }
  };

  return (
    <form className="user-data-form">
      <Input
        id="username-input"
        type="text"
        placeholder="Votre pseudo"
        state={{
          inputValue: usernameInputValue,
          setInputValue: setUsernameInputValue,
        }}
        error={errorMessages.username}
        required={props.requiredFields?.username}
      >
        Nom d'utilisateur
      </Input>
      <Input
        id="email-input"
        type="email"
        placeholder="Votre adresse email"
        state={{
          inputValue: emailInputValue,
          setInputValue: setEmailInputValue,
        }}
        error={errorMessages.email}
        required={props.requiredFields?.email}
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
        required={props.requiredFields?.password}
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
        required={props.requiredFields?.password}
      >
        Confirmez votre mot de passe
      </Input>
      <button type="button" onClick={handleSubmit}>
        {props.submitMessage}
      </button>
    </form>
  );
}
