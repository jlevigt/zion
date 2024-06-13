import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

import errorHandler from "errors/errorHandler";
import BadRequestError from "errors/BadRequestError";

export default async function handler(request, response) {
  try {
    const verified = authentication.verifyJwt(request.headers.auth);
    const findedUser = await user.findOneByEmail(verified.email);

    switch (request.method) {
      case "GET":
        authorization.canRequest(findedUser, "read:solicitation:list");

        const solicitationsList = await user.listSolicitations();

        return response.status(200).json(solicitationsList);

      case "PATCH":
        authorization.canRequest(findedUser, "update:user:role");

        const usernameToUpdate = request.body.username;
        const newRole = request.body.role;

        if (!usernameToUpdate || !newRole) {
          throw new BadRequestError("Um ou mais campos em branco");
        }

        await user.updateRole(usernameToUpdate, newRole);

        return response.status(204).end();

      case "DELETE":
        authorization.canRequest(findedUser, "delete:user");

        const usernameToDelete = request.body.username;

        await user.deleteUserByUsername(usernameToDelete);

        return response.status(204).end();

      default:
        response.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return response.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    errorHandler(err, response);
  }
}
