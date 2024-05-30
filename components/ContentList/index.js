import { useState, useEffect } from "react";

export default function ContentList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/v1/contents");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <ul className="ulStyle">
      {posts.map((post) => (
        <li className="liStyle" key={post.id}>
          <h3>{post.title}</h3>
          <p>
            <strong>Localização:</strong> {post.location}
          </p>
          <p>
            <strong>Data do Evento:</strong> {post.event_day}
          </p>
          <p>
            <strong>Hora do Evento:</strong> {post.event_time}:00
          </p>
          <p>
            <strong>Descrição:</strong> {post.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
