import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import PostPage from './Pages/Post';
import UserPage from './Pages/User';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import CreatePost from './Pages/CreatePost';
import EditPostPage from './Pages/EditPostPage';
import { useEffect, useState } from 'react';
import { User } from '.';
import { useGetLoggedUserLazyQuery } from './graphql';

export default function App() {
  const [loggedUser, setLoggedUser] = useState<User | undefined>();

  const [getLoggedUser] = useGetLoggedUserLazyQuery();

  const handleFetchLoggedUser: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await getLoggedUser();
    if (!queryResult.data?.getLoggedUser) {
      return;
    }
    const user: User = queryResult.data.getLoggedUser;
    setLoggedUser(user);
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      await handleFetchLoggedUser();
    })();
  }, []);

  return (
    <BrowserRouter>
      <Header loggedUser={loggedUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
        />
        <Route
          path="/post/:postId"
          element={<PostPage loggedUser={loggedUser} />}
        />
        <Route
          path="/post/:postId/update"
          element={<EditPostPage loggedUser={loggedUser} />}
        />
        <Route
          path="/user/:userId"
          element={
            <UserPage loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
        />
        <Route
          path="/create"
          element={<CreatePost loggedUser={loggedUser} />}
        />
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
