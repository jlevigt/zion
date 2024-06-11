import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

export default async function handler(request, response) {
  const verified = authentication.verifyJwt(request.headers.auth);
  const findedUser = await user.findOneByEmail(verified.email);

  switch (request.method) {
    case "PATCH":
      authorization.canRequest(findedUser, "update:user:role");

      const username = request.body.username;
      const role = request.body.role;

      await user.updateRole(username, role);

      return response.status(200).json({ msg: "OK" });

    default:
      return;
  }
}
