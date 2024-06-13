import { useRouter } from "next/router";
import { useRef } from "react";

import Layout from "components/Layout";

export default function AtualizarPerfil() {
  return (
    <Layout customContainerClass="form-container">
      <UpdateProfileForm />
    </Layout>
  );
}

function UpdateProfileForm() {
  const router = useRouter();

  const usernameRef = useRef("");
  const emailRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem("auth"));

    const username = usernameRef.current.value;
    const email = emailRef.current.value;

    try {
      const response = await fetch("/api/v1/users/self", {
        method: "PATCH",
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      });

      if (response.status === 200) {
        return router.push("/login");
      }

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch (error) {
      alert("Alguma coisa deu errado");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Atualizar Perfil</h1>

      <label>Username</label>
      <input ref={usernameRef}></input>

      <label>Email</label>
      <input ref={emailRef}></input>

      <button type="submit" className="submit-button">
        Atualizar
      </button>
    </form>
  );
}
