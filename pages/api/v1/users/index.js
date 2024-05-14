import user from "models/user";

export default async function users(request, response) {
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
