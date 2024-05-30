import { useRouter } from "next/router";
import { useRef } from "react";

export default function Login() {
  return <LoginForm />;
}

function LoginForm() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  async function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("/api/v1/auth", {
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
      router.push("/");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>email</label>
      <br />
      <input ref={emailRef}></input>
      <br />
      <label>password</label>
      <br />
      <input ref={passwordRef}></input>
      <br />
      <button type="submit">Entrar</button>
      <br />
      <a href="/cadastro">Criar cadastro</a>
    </form>
  );
}
