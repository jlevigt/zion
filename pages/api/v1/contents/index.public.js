import content from "models/content";
import user from "models/user";

export default async function contents(request, response) {
  if (request.method == "GET") {
    const contentList = await content.findAll();

    return response.status(200).json(contentList);
  }
  if (request.method == "POST") {
    const token = JSON.parse(request.headers.auth);

    const user_email = token.user.email;
    const userStored = await user.findOneByEmail(user_email);

    const contentData = {
      owner_id: userStored.id,
      title: request.body.title,
      body: request.body.body,
    };

    const newContent = await content.create(contentData);

    return response.status(201).json(newContent);
  }
}
