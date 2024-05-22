import { useRef } from "react";

import DefaultLayout from "components/DefaultLayout";
import TextInput from "components/TextInput";

export default function Login() {
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
}

function LoginForm() {
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
      }}>
      <TextInput label="Email" ref={emailRef} />
      <TextInput label="Password" ref={passwordRef} />
      <button type="submit">Login</button>
    </form>
  );
}
