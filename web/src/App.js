import React, { useState, useEffect, useContext } from "react";
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

import Content from "./components/Content";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Protected from "./components/Protected";
import Register from "./components/Register";
import { UserContext } from "./contexts/UserContext";
import { useRoutes } from './routes';

import Loading from './components/Loading'

const URL = 'http://localhost:4000/refresh_token';
const URL_LOGOUT = 'http://localhost:4000/logout';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const routes = useRoutes(loading);

  const logOutCallback = async () => {
    await fetch(URL_LOGOUT, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser({});
  };

  useEffect(() => {
    async function checkRefreshToken() {
      const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUser({
        accessToken: result.accessToken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) {
    console.log(loading);
    return (
      <Loading />
    )
  }
  console.log(loading);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Router>
          { routes }
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
