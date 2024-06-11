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
    <ul className="ulStyle">
      {users.map((user) => (
        <li className="liStyle" key={user.username}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Criado em:</strong> {new Date(user.created_at).toLocaleDateString("pt-BR")}
          </p>
        </li>
      ))}
    </ul>
  );
}
