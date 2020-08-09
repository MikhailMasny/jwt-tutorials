const dotenv = require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');

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

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
