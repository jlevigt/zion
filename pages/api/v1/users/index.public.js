import user from "models/user";
import token from "models/token";

export default async function users(request, response) {
  if (request.method == "GET") {
    const bearerToken = JSON.parse(request.headers.auth);
    if (!bearerToken) {
      return response.status(400).json({ msg: "token não foi enviado no header da request" });
    }

    token.validate(bearerToken.auth);

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
