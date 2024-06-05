import authentication from "models/authentication";
import user from "models/user";

export default async function usersHandler(request, response) {
  switch (request.method) {
    case "GET":
      // authentication
      if (!request.headers.auth) {
        return response.status(401).json({ msg: "token não foi enviado no header da request" });
      }

      try {
        const token = JSON.parse(request.headers.auth);
        authentication.verifyJwt(token); // aplicar error handling
      } catch (error) {
        return response.status(401).json({ err: "Não possui autenticação" });
      }

      return usersGetHandler(request, response);
    case "POST":
      return usersPostHandler(request, response);
    default:
      response.setHeader("Allow", ["GET", "POST"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}

async function usersGetHandler(request, response) {
  const usersList = await user.listUsers();
  return response.status(200).json(usersList);
}

async function usersPostHandler(request, response) {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ error: "Bad request" });
  }

  const userData = {
    username: username,
    email: email,
    password: password,
  };

  const createdUser = await user.createUser(userData);
  return response.status(201).json(createdUser);
}
