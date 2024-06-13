import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "components/Layout";

export default function Perfil() {
  return (
    <Layout customContainerClass={"form-container"}>
      <UserProfile />
    </Layout>
  );
}

function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  async function handleDeleteProfile() {
    const token = JSON.parse(localStorage.getItem("auth"));

    try {
      const response = await fetch("api/v1/users/self", {
        method: "DELETE",
        headers: {
          auth: token,
        },
      });

      if (response.status == 204) {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        setUser(null);

        return router.push("/login");
      }

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch (error) {
      alert("Alguma coisa deu errado");
    }
  }

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="centralized">
      <h1 style={{ color: "black" }}>Perfil</h1>

      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Permissão:</strong> {user.role}
      </p>

      <a href="/perfil/atualizar" style={{ color: "blue" }}>
        Atualizar perfil
      </a>

      <button onClick={handleDeleteProfile} className="centralized-button">
        Deletar Perfil
      </button>
    </div>
  );
}
