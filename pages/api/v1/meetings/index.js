import authentication from "models/authentication";
import meeting from "models/meeting";

export default async function meetingsHandler(request, response) {
  // authentication
  if (!request.headers.auth) {
    return response.status(401).json({ msg: "token não foi enviado no header da request" });
  }
  try {
    const token = request.headers.auth;
    authentication.verifyJwt(token); // aplicar error handling
  } catch (error) {
    return response.status(401).json({ err: "Não possui autenticação" });
  }

  switch (request.method) {
    case "GET":
      return meetingsGetHandler(response);
    case "POST":
      // authorization
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

  let createdMeeting;
  try {
    createdMeeting = await meeting.createMeeting(meetingData);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ msg: "Bad request" });
  }

  return response.status(201).json(createdMeeting);
}
