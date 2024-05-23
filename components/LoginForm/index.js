import { useRef } from "react";

import TextInput from "components/TextInput";

export default function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("/api/v1/tokens", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const token = JSON.stringify(await response.json());
    if (response.status == 201) {
      localStorage.setItem("auth", token);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <TextInput label="Email" ref={emailRef} />
      <TextInput label="Password" ref={passwordRef} />
      <br />
      <button type="submit">Login</button> <br />
      <a href="/cadastro">Crie sua conta</a>
    </form>
  );
}

// TODO:
// Adicionar área que leva para /cadastro
