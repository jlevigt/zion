import database from "infra/database";

async function createMeeting(meetingData) {
  const query = {
    text: `
      INSERT INTO
        meetings (day, time, location, theme)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *  
    `,
    values: [meetingData.day, meetingData.time, meetingData.location, meetingData.theme],
  };

  const results = await database.query(query);
  return results.rows[0];
}

async function listMeetings() {
  const query = {
    text: `
      SELECT
        *
      FROM
        meetings
    `,
  };

  const results = await database.query(query);
  return results.rows;
}

export default {
  createMeeting,
  listMeetings,
};
