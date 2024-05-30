import user from "models/user";
import token from "models/token";

export default async function usersHandler(request, response) {
  if (request.method == "GET") {
    if (!request.headers.auth) {
      return response.status(400).json({ msg: "token não foi enviado no header da request" });
    }

    const auth = JSON.parse(request.headers.auth);

    token.validate(auth.auth);

    const usersList = await user.findAll();

    return response.status(200).json(usersList);
  }

  if (request.method == "POST") {
    const userData = {
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    };

    const newUser = await user.create(userData);

    return response.status(201).json(newUser);
  }
}
