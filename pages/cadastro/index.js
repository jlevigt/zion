import { useRouter } from "next/router";
import { useRef } from "react";

export default function Cadastro() {
  return <SignUpForm />;
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
      const response = await fetch(`/api/v1/users`, {
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
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Cadastro</h1>
      <label>username</label>
      <br />
      <input ref={usernameRef}></input>
      <br />
      <label>email</label>
      <br />
      <input ref={emailRef}></input>
      <br />
      <label>password</label>
      <br />
      <input ref={passwordRef}></input>
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
