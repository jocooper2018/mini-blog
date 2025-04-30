import './index.css';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../..';
import UserDataForm from '../../Components/UserDataForm';
import { useCreateUserMutation } from '../../graphql';

interface SignUpProps {
  loggedUser: User | undefined;
  setLoggedUser: (user: User | undefined) => void;
}

export default function SignUp(props: SignUpProps) {
  const [fetchSignUp] = useCreateUserMutation();

  const handleSignup = async (userData: {
    email: string;
    username: string;
    password: string;
  }): Promise<boolean> => {
    const queryResponse = await fetchSignUp({
      variables: {
        createUserDto: {
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
      },
    });
    if (!queryResponse.data?.createUser) return false;
    const userCreated: User = queryResponse.data.createUser;
    props.setLoggedUser(userCreated);
    return true;
  };

  return props.loggedUser ? (
    <Navigate to={`/user/${props.loggedUser.id}`} />
  ) : (
    <main className="signup-page">
      <h1>Créer un compte</h1>
      <span>
        Vous avez déjà un compte&nbsp;? <Link to="/login">Se connecter</Link>
      </span>
      <UserDataForm
        setLoggedUser={props.setLoggedUser}
        handleSubmit={handleSignup}
        requiredFields={{ email: true, username: true, password: true }}
        submitMessage="Créer un compte"
      />
    </main>
  );
}
