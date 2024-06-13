import bcryptjs from "bcryptjs";

import database from "infra/database.js";

import BadRequestError from "errors/BadRequestError.js";

const COST = 1;

async function create(postedUserData) {
  const validUserData = validatePostSchema(postedUserData);
  await validateUniqueUsername(validUserData.username);
  await validateUniqueEmail(validUserData.email);
  validUserData.password = await bcryptjs.hash(validUserData.password, COST);

  const query = {
    text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    values: [validUserData.username, validUserData.email, validUserData.password],
  };

  await database.query(query);
}

async function findAll() {
  const query = {
    text: "SELECT * FROM users",
  };

  const results = await database.query(query);
  return results.rows;
}

async function findOneByEmail(email) {
  const query = {
    text: "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT  1",
    values: [email],
  };

  const results = await database.query(query);
  return results.rows[0];
}

async function updateRole(username, role) {
  const query = {
    text: "UPDATE users SET role = ($1) WHERE username = ($2)",
    values: [role, username],
  };

  await database.query(query);

  return;
}

async function updateEmail(userId, newEmail) {
  const query = {
    text: "UPDATE users SET email = $1 WHERE id = $2",
    values: [newEmail, userId],
  };

  await database.query(query);
}

async function updateUsername(userId, newUsername) {
  const query = {
    text: "UPDATE users SET username = $1 WHERE id = $2",
    values: [newUsername, userId],
  };

  await database.query(query);
}

async function deleteUserByUsername(username) {
  const query = {
    text: "DELETE FROM users WHERE username = $1",
    values: [username],
  };

  await database.query(query);
}

async function listSolicitations() {
  const query = {
    text: "SELECT * FROM users WHERE role = 'waiting'",
  };

  const results = await database.query(query);
  return results.rows;
}

function validatePostSchema(postedUserData) {
  if (postedUserData.password.length < 6) {
    throw new BadRequestError("A senha deve ter no mínimo 6 caracteres");
  }

  return postedUserData;
}

async function validateUniqueUsername(username) {
  const query = {
    text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1)",
    values: [username],
  };

  const results = await database.query(query);

  if (results.rowCount > 0) {
    throw new BadRequestError("O nome de usuário já está em uso");
  }

  return;
}

async function validateUniqueEmail(email) {
  const query = {
    text: "SELECT email FROM users WHERE LOWER(email) = LOWER($1)",
    values: [email],
  };

  const results = await database.query(query);

  if (results.rowCount > 0) {
    throw new BadRequestError("O email já está em uso");
  }

  return;
}

export default Object.freeze({
  create,
  findAll,
  findOneByEmail,
  updateRole,
  updateEmail,
  updateUsername,
  deleteUserByUsername,
  listSolicitations,
});
