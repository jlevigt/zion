import { useState, useEffect } from "react";

export default function UsersList() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    async function fetchusers() {
      try {
        const response = await fetch("/api/v1/users", {
          headers: {
            auth: localStorage.getItem("auth"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setusers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchusers();
  }, []);

  return (
    <ul className="ulStyle">
      {users.map((user) => (
        <li className="liStyle" key={user.id}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Líder:</strong> {user.is_admin ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Criado em:</strong> {new Date(user.created_at).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
