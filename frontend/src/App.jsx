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
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Month from './components/Month';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  
  const [isSignUp, setIsSignUp] = useState(false); // Lift state for sign-up
  const [isStudent, setIsStudent] = useState(true); // Lift state for role

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  const toggleSignUp = () => setIsSignUp(!isSignUp);
  const toggleRole = () => setIsStudent(!isStudent);

  return (
    <>
      <SiteHeadingAndNav isSignUp={isSignUp} toggleSignUp={toggleSignUp} isStudent={isStudent} toggleRole={toggleRole} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<AuthPage isSignUp={isSignUp} isStudent={isStudent} toggleSignUp={toggleSignUp} toggleRole={toggleRole} />} />
          <Route path='/sign-up' element={<AuthPage isSignUp={isSignUp} isStudent={isStudent} toggleSignUp={toggleSignUp} toggleRole={toggleRole} />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/users/:id' element={<UserPage />} />
          <Route path='/rules' element={<BudgetSelectionPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/month' element={<Month />} /> 
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

