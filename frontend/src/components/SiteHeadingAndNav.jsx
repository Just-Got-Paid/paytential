import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav({ isSignUp, toggleSignUp, isStudent, toggleRole }) {
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
              <li><NavLink to={isSignUp ? "/sign-up" : "/login"} onClick={toggleSignUp}>{isSignUp ? "Login" : "Sign Up"}</NavLink></li>
              <li><NavLink to={isSignUp ? "/sign-up" : "/login"} onClick={toggleRole}>{isStudent ? "Student" : "Educator"} {isSignUp ? "Sign Up" : "Login"}</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
