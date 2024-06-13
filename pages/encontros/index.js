import { useRouter } from "next/router";
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
  const router = useRouter();

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

        switch (response.status) {
          case 200:
            const data = await response.json();
            setPosts(data);
            return;

          case 204:
            return alert("Nenhuma publicação foi encontrada nessa página");

          case 401:
            return router.push("login");

          case 403:
            const responseBody = await response.json();
            alert(responseBody.message);
            router.push("perfil");
            return;
        }
      } catch (error) {
        alert("Alguma coisa deu errado");
      }
    }

    fetchPosts();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage + -1);
      return;
    }
  };

  return (
    <div style={{ minHeight: 500 }}>
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
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
        <button onClick={handlePreviousPage}>&#60;</button>
        <span style={{ color: "white" }}>{page}</span>
        <button onClick={handleNextPage}>&#62;</button>
      </div>
    </div>
  );
}
