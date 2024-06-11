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
    async function fetchsolicitations() {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));

        const response = await fetch("/api/v1/users/solicitations", {
          headers: {
            auth: token,
          },
        });

        if (response.status == 200) {
          const responseBody = await response.json();
          console.log(responseBody);
          setSolicitations(responseBody);
          return;
        }

        alert("Alguma coisa deu errado");
      } catch (error) {
        alert("Alguma coisa deu errado");
      }
    }

    fetchsolicitations();
  }, []);

  return (
    <ul className="ulStyle">
      {solicitations.map((solicitation) => (
        <li className="liStyle" key={solicitation.username}>
          <p>
            <strong>Username:</strong> {solicitation.username}
          </p>
          <p>
            <strong>Role:</strong> {solicitation.role}
          </p>
          <p>
            <strong>Criado em:</strong> {new Date(solicitation.created_at).toLocaleDateString("pt-BR")}
          </p>
        </li>
      ))}
    </ul>
  );
}
