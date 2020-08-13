import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const Navigation = () => {
  const [user] = useContext(UserContext);

  if (user.accessToken && user.accessToken !== "") {
    return (
      <div>
        <p>
          <Link to="/">Index</Link>
        </p>
        <p>
          <Link to="/logout">Logout</Link>
        </p>
        <p>
          <Link to="/protected">Protected</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        <Link to="/">Index</Link>
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Navigation;
