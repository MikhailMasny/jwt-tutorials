import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import LogoutPage from "./pages/LogoutPage";

export const useRoutes = (user) => {
  if (user.accessToken && user.accessToken !== '') {
    return (
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/protected" exact>
          <ProtectedPage />
        </Route>
        <Redirect to="/" />
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
