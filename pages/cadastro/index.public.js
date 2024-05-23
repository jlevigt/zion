import { useRouter } from "next/router";
import { useRef } from "react";

import DefaultLayout from "components/DefaultLayout";
import TextInput from "components/TextInput";

export default function Register() {
  return (
    <DefaultLayout>
      <SignUpForm />
    </DefaultLayout>
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

    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (response.status === 201) {
      router.push("/login");
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
      <h1>Cadastro</h1>
      <TextInput label="Nome de usuário" ref={usernameRef} />
      <TextInput label="Email" ref={emailRef} />
      <TextInput label="Senha" ref={passwordRef} />
      <br />
      <button type="submit">Criar cadastro</button>
    </form>
  );
}
