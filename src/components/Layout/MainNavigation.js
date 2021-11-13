import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import classes from "./MainNavigation.module.css";
import { useHistory } from "react-router-dom";

const MainNavigation = () => {
  const authCTX = useContext(AuthContext);
  const isLoggedIn = authCTX.isLoggedIn;
  //using router dom to redirect
  const history = useHistory();
  const reRoute = () => {
    history.replace("/auth");
    authCTX.logOut();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={reRoute}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
