import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

export default async function handler(request, response) {
  const verified = authentication.verifyJwt(request.headers.auth);
  const findedUser = await user.findOneByEmail(verified.email);

  switch (request.method) {
    case "GET":
      authorization.canRequest(findedUser, "read:solicitations");

      const solicitationsList = await user.listSolicitations();

      return response.status(200).json(solicitationsList);
  }
}
