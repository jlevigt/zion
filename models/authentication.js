import jwt from "jsonwebtoken";

import user from "models/user";

const EXPIRATION_IN_SECONDS = 60 * 60 * 24; // 1 dia

function createJwt(email) {
  const role = user.findUserByEmail(email).role;

  const payload = {
    email: email,
    role: role,
    exp: Math.floor(Date.now() / 1000) + EXPIRATION_IN_SECONDS,
  };

  const token = jwt.sign(payload, process.env.PRIVATE_KEY);
  return token;
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.PRIVATE_KEY);
}

export default Object.freeze({
  createJwt,
  verifyJwt,
});
