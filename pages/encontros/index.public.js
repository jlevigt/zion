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
        height: "100vh",
        listStyleType: "none",
        display: "flex",
        flexDirection: "row",
      }}>
      {posts.map((post) => (
        <li
          style={{
            padding: 5,
          }}
          key={post.id}>
          Título: {post.title} <br />
          Corpo: {post.body} <br />
        </li>
      ))}
    </ul>
  );
}

// TODO:
// Criar componente Content
