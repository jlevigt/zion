import errorHandler from "errors/errorHandler";
import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

export default async function handler(request, response) {
  try {
    const verified = authentication.verifyJwt(request.headers.auth);
    const findedUser = await user.findOneByEmail(verified.email);

    switch (request.method) {
      case "PATCH":
        authorization.canRequest(findedUser, "update:self");

        const { newEmail, newUsername } = request.body;

        if (newEmail) {
          await user.updateEmail(findedUser.id, newEmail);
        }
        if (newUsername) {
          await user.updateUsername(findedUser.id, newUsername);
        }

        return response.status(204).end();

      case "DELETE":
        authorization.canRequest(findedUser, "delete:self");

        await user.deleteUser(findedUser.id);

        return response.status(204).end();

      default:
        return response.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    errorHandler(err, response);
  }
}
