import authentication from "models/authentication.js";
import authorization from "models/authorization.js";
import user from "models/user.js";

import errorHandler from "errors/errorHandler.js";
import BadRequestError from "errors/BadRequestError.js";

export default async function handler(request, response) {
  try {
    switch (request.method) {
      case "GET":
        const verified = authentication.verifyJwt(request.headers.auth);
        const findedUser = await user.findOneByEmail(verified.email);

        authorization.canRequest(findedUser, "read:user:list");

        const usersList = await user.findAll();
        const secureUsersList = authorization.filterOutput("read:user:list", usersList);

        return response.status(200).json(secureUsersList);

      case "POST":
        const { username, email, password } = request.body;

        if (!username || !email || !password) {
          throw new BadRequestError("Um ou mais campos em branco");
        }

        const userData = {
          username: username,
          email: email,
          password: password,
        };

        await user.create(userData);

        return response.status(201).end();

      default:
        response.setHeader("Allow", ["GET", "POST"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (err) {
    return errorHandler(err, response);
  }
}
