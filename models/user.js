import bcryptjs from "bcryptjs";

import database from "infra/database.js";

async function findAll() {
  const query = {
    text: `
      SELECT
        *
      FROM
        users
      `,
  };
  const results = await database.query(query);

  return results.rows;
}

async function findOneByEmail(email) {
  const query = {
    text: `
      SELECT
        *
      FROM
        users
      WHERE
        LOWER(email) = LOWER($1)
      LIMIT
        1`,
    values: [email],
  };

  const results = await database.query(query);

  return results.rows[0];
}

async function create(userData) {
  const username_is_unique = await validateUniqueUsername(userData.username);
  if (!username_is_unique) {
    return { msg: "username is not valid" };
  }

  const email_is_unique = await validateUniqueEmail(userData.email);
  if (!email_is_unique) {
    return { msg: "email is not valid" };
  }

  const saltRounds = 14;
  userData.password = await bcryptjs.hash(userData.password, saltRounds);

  const query = {
    text: `
      INSERT INTO
        users (username, email, password)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      ;`,
    values: [userData.username, userData.email, userData.password],
  };

  const results = await database.query(query);
  const newUser = results.rows[0];

  return newUser;
}

async function validateUniqueUsername(username) {
  const query = {
    text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1)",
    values: [username],
  };

  const results = await database.query(query);

  if (results.rowCount > 0) {
    return 0;
  }

  return 1;
}

async function validateUniqueEmail(email) {
  const query = {
    text: "SELECT email FROM users WHERE LOWER(email) = LOWER($1)",
    values: [email],
  };

  const results = await database.query(query);

  if (results.rowCount > 0) {
    return 0;
  }

  return 1;
}

export default Object.freeze({
  findAll,
  findOneByEmail,
  create,
});
