import jwt from "jsonwebtoken";

const EXPIRATION_IN_SECONDS = 60 * 30; // 30 minuto

function create(email) {
  const payload = { email: email, exp: Date.now() / 1000 + EXPIRATION_IN_SECONDS };
  const token = jwt.sign(payload, process.env.PRIVATE_KEY);

  return {
    user: payload,
    auth: token,
  };
}

export default Object.freeze({
  create,
});
