import React, { useContext } from "react";

import { URL_LOGOUT } from "../constants/url";
import { UserContext } from "../contexts/UserContext";

const LogoutPage = () => {
  const [user, setUser] = useContext(UserContext);

  const logOutCallback = async () => {
    await fetch(URL_LOGOUT, {
      method: "POST", // TODO: to get?!
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser({});
  };
  return (
    <div>
      <button onClick={logOutCallback}>Logout</button>
    </div>
  );
};

export default LogoutPage;
