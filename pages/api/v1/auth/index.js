import bcryptjs from "bcryptjs";

import authentication from "models/authentication";
import user from "models/user";

export default async function authHandler(request, response) {
  switch (request.method) {
    case "GET":
      return authGetHandler(request, response);
    case "POST":
      return authPostHandler(request, response);
    default:
      response.setHeader("Allow", ["POST", "GET"]);
      return response.status(405).end(`Método ${request.method} não permitido`);
  }
}

async function authGetHandler(request, response) {
  try {
    const token = request.headers.auth;
    console.log(token);
    authentication.verifyJwt(token);
    return response.status(200).json({ msg: "Token válido" });
  } catch (err) {
    console.log(err);
    return response.status(401).json({ msg: "Token inválido" });
  }
}

async function authPostHandler(request, response) {
  const { email, password } = request.body;

  let storedUser;

  try {
    storedUser = await user.findUserByEmail(email);
    const passwordMatches = await bcryptjs.compare(password, storedUser.password);
    if (!passwordMatches) {
      return response.status(400).json({ msg: "senha incorreta" });
    }
  } catch (error) {
    throw error;
  }

  const auth = await authentication.createJwt(email);
  return response.status(201).json(auth);
}
