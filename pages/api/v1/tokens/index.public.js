import bcryptjs from "bcryptjs";

import token from "models/token";
import user from "models/user";

export default async function tokens(request, response) {
  if (request.method == "POST") {
    const { email, password } = request.body;

    let storedUser;

    try {
      storedUser = await user.findOneByEmail(email);
      const passwordMatches = await bcryptjs.compare(password, storedUser.password);
      if (!passwordMatches) {
        return response.status(400).json({ msg: "senha incorreta" });
      }
    } catch (error) {
      throw error;
    }

    const auth = token.create(email);

    return response.status(201).json(auth);
  }
}
