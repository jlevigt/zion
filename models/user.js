import bcryptjs from "bcryptjs";

import database from "infra/database.js";

const COST = 1;

async function createUser(userData) {
  if (!(await isUniqueUsername(userData.username))) {
    return { msg: "username já é usado" };
  }
  if (!(await isUniqueEmail(userData.email))) {
    return { msg: "email já é usado" };
  }

  userData.password = await bcryptjs.hash(userData.password, COST);

  const query = {
    text: `
      INSERT INTO
        users (username, email, password)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
    values: [userData.username, userData.email, userData.password],
  };

  const results = await database.query(query);
  return results.rows[0];
}

async function listUsers() {
  const query = {
    text: `
      SELECT
        username, role, created_at
      FROM
        users
      `,
  };

  const results = await database.query(query);
  return results.rows;
}

async function findUserByEmail(email) {
  const query = {
    text: `
      SELECT
        *
      FROM
        users
      WHERE
        LOWER(email) = LOWER($1)
      LIMIT
        1
      `,
    values: [email],
  };

  const results = await database.query(query);
  return results.rows[0];
}

async function isUniqueUsername(username) {
  try {
    const query = {
      text: `
        SELECT
          username
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
        `,
      values: [username],
    };

    const results = await database.query(query);

    return results.rowCount === 0; // Se não há resultados, o nome de usuário é único
  } catch (error) {
    console.error("Erro ao validar nome de usuário único:", error);
    return false; // Retorna false em caso de erro para indicar que a validação falhou
  }
}

async function isUniqueEmail(email) {
  try {
    const query = {
      text: `
        SELECT
          email
        FROM
          users
        WHERE
          LOWER(email) = LOWER($1)
        `,
      values: [email],
    };

    const results = await database.query(query);

    return results.rowCount === 0; // Se não há resultados, o email é único
  } catch (error) {
    console.error("Erro ao validar email único:", error);
    return false; // Retorna false em caso de erro para indicar que a validação falhou
  }
}

export default Object.freeze({
  createUser,
  listUsers,
  findUserByEmail,
});
