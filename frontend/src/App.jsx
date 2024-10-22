import { useContext, useEffect } from 'react';
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
import AdminPage from './pages/AdminPage'
import Month from './components/Month'

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/sign-up' element={<AuthPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/rules' element={<BudgetSelectionPage />} />
        <Route path='/admin' element ={<AdminPage />} />
        <Route path='/month' element={<Month />}/> 
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}
