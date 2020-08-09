require('dotenv/config');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');

const { isAuth } = require('./isAuth');
const { fakeDb } = require('./fakeDb');
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('./tokens');

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Needed to be able to read body data
// Use to support JSON-encoded bodies
server.use(express.json());

// Use to support URL-encoded bodies
server.use(
  express.urlencoded({
    extended: true,
  }),
);

server.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exist..
    const user = fakeDb.find((u) => u.email === email);
    if (user) {
      throw new Error('User already exist..');
    }

    // If user not exist, hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the user in fake database
    fakeDb.push({
      id: fakeDb.length,
      email,
      password: hashedPassword,
    });
    res.send({
      message: 'User created',
    });

    console.log(fakeDb);
  } catch (error) {
    res.send({
      error: `${error.message}`,
    });
  }
});

server.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in fake database. If not exist - send error
    const user = fakeDb.find((u) => u.email === email);
    if (!user) {
      throw new Error('User does not exist');
    }

    // Compare crypted password and see if it checks out, else - send error
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('Login or password is not correct');
    }

    // Create access and refresh tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // Put refresh token into fake database
    user.refreshToken = refreshToken;

    console.log(fakeDb);

    // Send tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, req, accessToken);
  } catch (error) {
    res.send({
      error: `${error.message}`,
    });
  }
});

server.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', { path: './refresh_token' });
  return res.send({
    message: 'Logged out',
  });
});

server.get('/protected', async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: 'This is protected data',
      });
    }
  } catch (error) {
    res.send({
      error: `${error.message}`,
    });
  }
});

server.post('/refresh_token', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.send({
      accessToken: '',
    });
  }

  let payload = null;
  try {
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.send({
      accessToken: '',
    });
  }

  const user = fakeDb.find((u) => u.id === payload.userId);
  if (!user) {
    return res.send({
      accessToken: '',
    });
  }
  if (user.refreshToken !== refreshToken) {
    return res.send({
      accessToken: '',
    });
  }

  const accessToken = createAccessToken(user.id);
  const newRefreshToken = createRefreshToken(user.id);
  user.refreshToken = newRefreshToken;

  sendRefreshToken(res, newRefreshToken);
  return res.send({
    accessToken,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
