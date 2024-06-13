import { useState, useEffect } from "react";

import Layout from "components/Layout";

export default function Solicitacoes() {
  return (
    <Layout>
      <SolicitationsList />
    </Layout>
  );
}

function SolicitationsList() {
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    fetchSolicitations();
  }, []);

  async function fetchSolicitations() {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await fetch("/api/v1/solicitations", {
        headers: {
          auth: token,
        },
      });

      if (response.status == 200) {
        const responseBody = await response.json();
        setSolicitations(responseBody);
        return;
      }

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch {
      alert("Alguma coisa deu errado");
    }
  }

  async function handleAccept(username, newRole) {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await fetch("/api/v1/solicitations", {
        method: "PATCH",
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          role: newRole,
        }),
      });

      if (response.status == 204) {
        alert("User atualizado com sucesso");
        return;
      }

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch {
      alert("Alguma coisa deu errado");
    } finally {
      await fetchSolicitations();
    }
  }

  async function handleReject(username) {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await fetch("/api/v1/solicitations", {
        method: "DELETE",
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (response.status == 204) {
        alert("User apagado com sucesso");
        return;
      }

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch {
      alert("Alguma coisa deu errado");
    } finally {
      await fetchSolicitations();
    }
  }

  return (
    <table className="tableStyle">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Permissão</th>
          <th>Criado em</th>
          <th>Aceitar</th>
          <th>Recusar</th>
        </tr>
      </thead>
      <tbody>
        {solicitations.map((user) => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{new Date(user.created_at).toLocaleDateString("pt-BR")}</td>
            <td>
              <button onClick={() => handleAccept(user.username, "member")}>Membro</button>
              <button onClick={() => handleAccept(user.username, "guest")}>Convidado</button>
            </td>
            <td>
              <button onClick={() => handleReject(user.username)}>Recusar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
