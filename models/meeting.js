import database from "infra/database";

async function create(meetingData) {
  const query = {
    text: "INSERT INTO meetings (day, time, location, theme) VALUES ($1, $2, $3, $4)",
    values: [meetingData.day, meetingData.time, meetingData.location, meetingData.theme],
  };

  await database.query(query);
}

async function listMeetings(page = 1, pageSize = 6) {
  const offset = (page - 1) * pageSize;

  const query = {
    text: "SELECT * FROM meetings ORDER BY day DESC LIMIT $1 OFFSET $2",
    values: [pageSize, offset],
  };

  const results = await database.query(query);
  return results.rows;
}

export default {
  create,
  listMeetings,
};
