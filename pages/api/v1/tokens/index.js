import token from "models/token";

export default function tokens(request, response) {
  if (request.method == "POST") {
    const { email } = request.body;

    const auth = token.create(email);

    return response.status(201).json(auth);
  }
}
