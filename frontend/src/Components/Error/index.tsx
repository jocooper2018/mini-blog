import './index.css';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <main className='error-404'>
      <h1>404 Not Found</h1>
      <p>La page que vous recherchez n'a pas été trouvé.</p>
      <Link to="/" className="button">
        Retour à l'accueil
      </Link>
    </main>
  );
}
