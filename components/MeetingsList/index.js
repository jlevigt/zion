import { useState, useEffect } from "react";

export default function MeetingsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/v1/meetings");
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
          <p>
            <strong>Data:</strong> {new Date(post.day).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <strong>Horário:</strong> {post.time}
          </p>
          <p>
            <strong>Lugar:</strong> {post.location}
          </p>

          <p>
            <strong>Tema:</strong> {post.theme}
          </p>
        </li>
      ))}
    </ul>
  );
}
