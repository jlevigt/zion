import bcryptjs from "bcryptjs";

import authentication from "models/authentication";
import user from "models/user";

import errorHandler from "errors/errorHandler";
import BadRequestError from "errors/BadRequestError";
import UnauthorizedError from "errors/UnauthorizedError";

export default async function handler(request, response) {
  try {
    switch (request.method) {
      case "POST":
        const { email, password } = request.body;
        if (!email || !password) {
          throw new BadRequestError("Um ou mais campos em branco");
        }

        const storedUser = await user.findOneByEmail(email);
        if (!storedUser) {
          throw new UnauthorizedError("Credenciais inválidas");
        }

        const passwordMatches = await bcryptjs.compare(password, storedUser.password);
        if (!passwordMatches) {
          throw new UnauthorizedError("Credenciais inválidas");
        }

        const token = await authentication.createJwt(email, storedUser.role);

        return response.status(201).json({
          user: {
            username: storedUser.username,
            email: storedUser.email,
            role: storedUser.role,
            created_at: storedUser.created_at,
          },
          token: token,
        });

      default:
        response.setHeader("Allow", ["POST", "GET"]);
        return response.status(405).end(`Método ${request.method} não permitido`);
    }
  } catch (err) {
    errorHandler(err, response);
  }
}
