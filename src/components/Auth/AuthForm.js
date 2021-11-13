import { useState, useRef, useContext } from "react";
// import axios from "axios";
import AuthContext from "../store/auth-context";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  //from react router dom
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  // const [loginData, setLoginData] = useState([]);
  const emailInput = useRef();
  const passInput = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  //using context
  const authCTX = useContext(AuthContext);

  //api key from firebase
  const apiKey = authCTX.Key;
  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const passWord = passInput.current.value;
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      //this api key is in react named project in firebase
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }
    const requestData = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email,
            password: passWord,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.idToken) {
          authCTX.login(data.idToken);
          //redirecting the page
          history.replace("/");
        }
        let msg = "Authentication failed";
        if (data && data.error && data.error.message) {
          msg = data.error.message;
        }
        if (!res.ok) throw new Error(msg);
      } catch (err) {
        alert(err);
      }
    };
    requestData();
  };
  // console.log(loginData);
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
