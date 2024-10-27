import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BudgetSelectionPage from './pages/BudgetPage';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Simulations from './pages/Simulations'
import AvatarPage from './pages/Avatar';


export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  
  const [isSignUp, setIsSignUp] = useState(false); // Lift state for sign-up
  const [isStudent, setIsStudent] = useState(true); // Lift state for role

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);


  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/simulation' element={<Simulations />} />
        <Route path='/avatar/:sim-id' element={<AvatarPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}

