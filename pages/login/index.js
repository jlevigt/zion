import { useRouter } from "next/router";
import { useRef } from "react";

import Layout from "components/Layout";

export default function Login() {
  return (
    <Layout customContainerClass="form-container">
      <LoginForm />
    </Layout>
  );
}

function LoginForm() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status == 201) {
        const responseBody = await response.json();
        const userData = JSON.stringify(responseBody.user);
        const token = JSON.stringify(responseBody.token);

        localStorage.setItem("user", userData);
        localStorage.setItem("auth", token);

        return router.push("/encontros");
      }

      alert("Alguma coisa deu errado");
    } catch {
      alert("Alguma coisa deu errado");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label>Email</label>
      <input ref={emailRef}></input>

      <label>Password</label>
      <input ref={passwordRef}></input>

      <button type="submit" className="submit-button">
        Entrar
      </button>

      <a href="/cadastro" style={{ color: "blue" }}>
        Criar cadastro
      </a>
    </form>
  );
}
