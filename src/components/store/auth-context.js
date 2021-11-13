import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logOut: () => {},
  Key: "",
});
export const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;
  const loggedInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const LogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loggedInHandler,
    logOut: LogOutHandler,
    Key: "AIzaSyDRJm1IKl09vYkYZM2YbQRdqst57h44EwI",
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
