import { React, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./components/store/auth-context";
function App() {
  const authCTX = useContext(AuthContext);
  const token = !!authCTX.token;
  // const path = token ? <HomePage /> : <AuthPage />;
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!token && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {token && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
