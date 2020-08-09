const { verify } = require('jsonwebtoken');

const isAuth = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('You need to login');
  }

  // Bearer token
  const token = authorization.split(' ')[1];
  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userId;
};

module.exports = {
  isAuth,
};
