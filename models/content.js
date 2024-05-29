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
        contents (owner_id, title, description, event_day, event_time, location)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        *  
    ;`,
    values: [
      contentData.owner_id,
      contentData.title,
      contentData.description,
      contentData.event_day,
      contentData.event_time,
      contentData.location,
    ],
  };

  const results = await database.query(query);
  const newContent = results.rows[0];

  return newContent;
}

export default {
  create,
  findAll,
};
