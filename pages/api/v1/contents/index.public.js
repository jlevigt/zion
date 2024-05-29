import content from "models/content";
import user from "models/user";

export default async function contents(request, response) {
  if (request.method === "GET") {
    try {
      const contentList = await content.findAll();
      return response.status(200).json(contentList);
    } catch (error) {
      console.error("Error fetching contents:", error);
      return response.status(500).json({ error: "Failed to fetch contents" });
    }
  }

  if (request.method === "POST") {
    try {
      const token = JSON.parse(request.headers.auth);
      const user_email = token.user.email;
      const userStored = await user.findOneByEmail(user_email);

      if (!userStored) {
        return response.status(401).json({ error: "User not authorized" });
      }

      const { title, description, event_day, event_time, location } = request.body;

      if (!title || !description || !event_day || !event_time || !location) {
        return response.status(400).json({ error: "Missing required fields" });
      }

      const contentData = {
        owner_id: userStored.id,
        title,
        description,
        event_day,
        event_time,
        location,
      };

      const newContent = await content.create(contentData);

      return response.status(201).json(newContent);
    } catch (error) {
      console.error("Error creating content:", error);
      return response.status(500).json({ error: "Failed to create content" });
    }
  }

  return response.status(405).json({ error: "Method not allowed" });
}
