import { useState, useEffect } from "react";

import Layout from "components/Layout";

export default function Posts() {
  return (
    <Layout>
      <MeetingsList />
    </Layout>
  );
}

function MeetingsList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));

        const response = await fetch(`/api/v1/meetings?page=${page}`, {
          headers: {
            auth: token,
          },
        });

        if (response.status == 200) {
          const data = await response.json();
          setPosts(data);
          return;
        }

        alert("Alguma coisa deu errado");
      } catch (error) {
        alert("Alguma coisa deu errado");
      }
    }

    fetchPosts();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
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
      <button onClick={handleNextPage}>&#62;</button>
    </div>
  );
}
