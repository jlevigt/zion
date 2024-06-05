import meeting from "models/meeting";

export default async function meetingsHandler(request, response) {
  switch (request.method) {
    case "GET":
      return meetingsGetHandler(response);
    case "POST":
      return meetingsPostHandler(request, response);
    default:
      response.setHeader("Allow", ["GET", "POST"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}

async function meetingsGetHandler(response) {
  const meetingList = await meeting.listMeetings();
  return response.status(200).json(meetingList);
}

async function meetingsPostHandler(request, response) {
  const { day, time, location, theme } = request.body;

  if (!day || !time || !location) {
    return response.status(400).json({ error: "Bad request" });
  }

  const meetingData = {
    day: day,
    time: time,
    location: location,
    theme: theme,
  };

  const createdMeeting = await meeting.createMeeting(meetingData);
  return response.status(201).json(createdMeeting);
}
