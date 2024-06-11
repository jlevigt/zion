import authentication from "models/authentication";
import authorization from "models/authorization";
import user from "models/user";

export default async function handler(request, response) {
  const verified = authentication.verifyJwt(request.headers.auth);
  if (!verified) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  const findedUser = await user.findOneByEmail(verified.email);

  switch (request.method) {
    case "PATCH":
      authorization.canRequest(findedUser, "update:self");

      const { newEmail, newUsername } = request.body;

      try {
        if (newEmail) {
          await user.updateEmail(findedUser.id, newEmail);
        }
        if (newUsername) {
          await user.updateUsername(findedUser.id, newUsername);
        }
        return response.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }

    case "DELETE":
      authorization.canRequest(findedUser, "delete:self");

      try {
        await user.deleteUser(findedUser.id);
        return response.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }

    default:
      return response.status(405).json({ error: "Method not allowed" });
  }
}
