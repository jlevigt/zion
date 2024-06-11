import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

export default async function handler(request, response) {
  // error handling

  switch (request.method) {
    case "GET":
      const verified = authentication.verifyJwt(request.headers.auth);
      const findedUser = await user.findOneByEmail(verified.email);

      authorization.canRequest(findedUser, "read:users:list");

      const usersList = await user.findAll();
      const secureUsersList = authorization.filterOutput(findedUser, "read:user:list", usersList);

      return response.status(200).json(secureUsersList);

    case "POST":
      const { username, email, password } = request.body;

      if (!username || !email || !password) {
        throw new Error("Bad request");
      }

      const userData = {
        username: username,
        email: email,
        password: password,
      };

      const newUser = await user.create(userData);
      const secureUserData = authorization.filterOutput(newUser, "read:user", newUser);

      return response.status(201).json(secureUserData);

    default:
      response.setHeader("Allow", ["GET", "POST"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
