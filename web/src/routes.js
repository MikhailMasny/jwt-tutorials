import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Content from "./components/Content";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Protected from "./components/Protected";
import Register from "./components/Register";

import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

export const useRoutes = (isAuthenticated) => {
  console.log('useRoutes' + isAuthenticated)
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/content" exact>
          <Content />
        </Route>
        <Route path="/navigation" exact>
          <Navigation />
        </Route>
        <Route path="/protected" exact>
          <Protected />
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <IndexPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
