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
          <li><NavLink to="/" exact="true">Home</NavLink></li>

          {currentUser ? (
            <>
              <li><NavLink to="/users" exact="true">Users</NavLink></li>
              <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.name}</NavLink></li>
            </>
          ) : (
            <>
              {/* Dynamic link for login or signup based on current state */}
              <li>
                <NavLink to={isSignUp ? "/sign-up" : "/login"} onClick={toggleSignUp}>
                  {isSignUp ? "Login" : "Sign Up"}
                </NavLink>
              </li>
              <li>
                <NavLink to={isSignUp ? "/sign-up" : "/login"} onClick={toggleRole}>
                  {isStudent ? "Switch to Educator" : "Switch to Student"} {isSignUp ? "Sign Up" : "Login"}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

