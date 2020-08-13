import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation';
import Loading from './components/Loading';
import { UserContext } from "./contexts/UserContext";
import { useRoutes } from './routes';
import { URL_REFRESH_TOKEN, URL_LOGOUT } from './constants/url';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const routes = useRoutes(user);

  useEffect(() => {
    async function checkRefreshToken() {
      const response = await fetch(URL_REFRESH_TOKEN, {
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

      setLoading(true);
    }
    checkRefreshToken();
  }, []);

  if (!loading) {
    return (
      <Loading />
    )
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Router>
          <Navigation />
          { routes }
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
