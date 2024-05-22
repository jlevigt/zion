import database from "infra/database";

async function findAll() {
  const query = {
    text: `
      SELECT
        *
      FROM
        contents
    `,
  };

  const results = await database.query(query);

  return results.rows;
}

async function create(contentData) {
  const query = {
    text: `
      INSERT INTO
        contents (owner_id, title, body)
      VALUES
        ($1, $2, $3)
      RETURNING
        *  
    ;`,
    values: [contentData.owner_id, contentData.title, contentData.body],
  };

  const results = await database.query(query);
  const newContent = results.rows[0];

  return newContent;
}

export default {
  create,
  findAll,
};
