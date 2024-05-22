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

function validate(token) {
  try {
    jwt.verify(token, process.env.PRIVATE_KEY);
    return;
  } catch (err) {
    throw err;
  }
}

export default Object.freeze({
  create,
  validate,
});
