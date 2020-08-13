import React, { useEffect, useContext } from "react";

import { UserContext } from "../contexts/UserContext";

const ProtectedPage = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <p className="green">This is protected page</p>
    </div>
  );
};

export default ProtectedPage;
