import bcryptjs from "bcryptjs";

import authentication from "models/authentication";
import user from "models/user";

export default async function handler(request, response) {
  // error handling

  switch (request.method) {
    case "POST":
      const { email, password } = request.body;
      console.log(email, password);

      if (!email || !password) {
        throw new Error("Bad request");
      }
      const storedUser = await user.findOneByEmail(email);
      if (!storedUser) {
        throw new Error("User não encontrado");
      }

      const passwordMatches = await bcryptjs.compare(password, storedUser.password);
      if (!passwordMatches) {
        throw new Error("Senha incorreta");
      }

      const token = await authentication.createJwt(email);
      const userData = {
        username: storedUser.username,
        email: storedUser.email,
        role: storedUser.role,
        created_at: storedUser.created_at,
      };
      const auth = {
        user: userData,
        token: token,
      };

      return response.status(201).json(auth);

    default:
      response.setHeader("Allow", ["POST", "GET"]);
      return response.status(405).end(`Método ${request.method} não permitido`);
  }
}
