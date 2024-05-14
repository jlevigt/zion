import { useRouter } from "next/router";
import { useRef } from "react";

export default function Register() {
  return (
    <div>
      <h1>Cadastro</h1>
      <SignUpForm />
    </div>
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
    } else {
      // Show error message
      console.error("Failed to register user.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label> <br />
      <input ref={usernameRef} placeholder="username" /> <br />
      <label>Email</label> <br />
      <input ref={emailRef} placeholder="email" /> <br />
      <label>Password</label> <br />
      <input ref={passwordRef} placeholder="password" /> <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
