import authentication from "models/authentication";
import authorization from "models/authorization";
import meeting from "models/meeting";
import user from "models/user";

export default async function Handler(request, response) {
  // error handling

  const verified = authentication.verifyJwt(request.headers.auth);
  const findedUser = await user.findOneByEmail(verified.email);

  switch (request.method) {
    case "GET":
      authorization.canRequest(findedUser, "read:meetings");

      const page = request.query.page;

      const meetingList = await meeting.listMeetings(page);

      if (meetingList.length === 0) {
        return response.status(404).json({ msg: "Recurso não encontrado" });
      }

      return response.status(200).json(meetingList);

    case "POST":
      authorization.canRequest(findedUser, "create:meeting");

      const { day, time, location, theme } = request.body;

      if (!day || !time || !location) {
        throw new Error("Bad request");
      }

      const meetingData = {
        day: day,
        time: time,
        location: location,
        theme: theme,
      };

      const createdMeeting = await meeting.create(meetingData);

      return response.status(201).json(createdMeeting);

    default:
      response.setHeader("Allow", ["GET", "POST"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
