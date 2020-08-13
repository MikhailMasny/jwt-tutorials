import React, { useEffect, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

const ProtectedPage = () => {
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
