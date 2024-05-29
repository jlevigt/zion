import { useState, useEffect } from "react";

import DefaultLayout from "components/DefaultLayout";

export default function Posts() {
  return (
    <DefaultLayout>
      <ContentList />
    </DefaultLayout>
  );
}

function ContentList() {
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
    <ul
      style={{
        // height: "100vh",
        listStyleType: "none",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}>
      {posts.map((post) => (
        <li
          style={{
            padding: 20,
            margin: 10,
            border: "1px solid #ccc",
            borderRadius: 10,
            width: "30%",
            boxSizing: "border-box",
          }}
          key={post.id}>
          <h3>{post.title}</h3>
          <p>
            <strong>Localização:</strong> {post.location}
          </p>
          <p>
            <strong>Data do Evento:</strong> {post.event_day}
          </p>
          <p>
            <strong>Hora do Evento:</strong> {post.event_time}
          </p>
          <p>
            <strong>Descrição:</strong> {post.description}
          </p>
          <p>
            <small>
              <strong>Criado em:</strong> {new Date(post.created_at).toLocaleString()}
            </small>
          </p>
        </li>
      ))}
    </ul>
  );
}
