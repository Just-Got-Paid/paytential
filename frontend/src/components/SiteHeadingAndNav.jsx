import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";


//we dont need these props ({ isSignUp, toggleSignUp, isStudent, toggleRole }
export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <NavLink id="logo" to="/">Paytential</NavLink>
      <nav>
        <ul>
          <li><NavLink to="/" exact>Home</NavLink></li>

          {currentUser ? (
            <>
              <li><NavLink to="/users" exact>Users</NavLink></li>
              <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.name}</NavLink></li>
            </>
          ) : (
            <>
              
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/sign-up">Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
