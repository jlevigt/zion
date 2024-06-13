import { useRouter } from "next/router";
import { useRef } from "react";

import Layout from "components/Layout";

export default function Cadastro() {
  return (
    <Layout customContainerClass="form-container">
      <SignUpForm />
    </Layout>
  );
}

function SignUpForm() {
  const router = useRouter();

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.status === 201) {
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
      <h1>Cadastro</h1>

      <label>Username</label>
      <input ref={usernameRef}></input>

      <label>Email</label>
      <input ref={emailRef}></input>

      <label>Password</label>
      <input ref={passwordRef}></input>

      <button type="submit" className="submit-button">
        Cadastrar
      </button>
    </form>
  );
}
