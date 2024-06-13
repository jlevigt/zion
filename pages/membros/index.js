import { useState, useEffect } from "react";

import Layout from "components/Layout";

export default function Membros() {
  return (
    <Layout>
      <UsersList />
    </Layout>
  );
}

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchusers() {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));

        const response = await fetch("/api/v1/users", {
          headers: {
            auth: token,
          },
        });

        if (response.status == 200) {
          const responseBody = await response.json();

          setUsers(responseBody);
          return;
        }

        alert("Alguma coisa deu errado");
      } catch (error) {
        alert("Alguma coisa deu errado");
      }
    }

    fetchusers();
  }, []);

  return (
    <table className="tableStyle">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Permissão</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{new Date(user.created_at).toLocaleDateString("pt-BR")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
