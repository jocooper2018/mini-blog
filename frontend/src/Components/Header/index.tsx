import { User } from '../..';
import isUser from '../../utils/isUser';
import './index.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
  loggedUser: User | undefined;
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
      </nav>
      <nav>
        <ul>
          {props.loggedUser && isUser(props.loggedUser) ? (
            <>
              <li>
                <Link to="/create">+ Créer</Link>
              </li>
              <li>
                <Link to={`/user/${props.loggedUser.id}`}>Mon compte</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
