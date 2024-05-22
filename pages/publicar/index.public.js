import { useRouter } from "next/router";
import { useRef } from "react";

import DefaultLayout from "components/DefaultLayout";
import TextInput from "components/TextInput";

export default function Post() {
  return (
    <DefaultLayout>
      <PostForm />
    </DefaultLayout>
  );
}

function PostForm() {
  const router = useRouter();

  const titleRef = useRef();
  const bodyRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    const response = await fetch("/api/v1/contents", {
      method: "POST",
      headers: {
        auth: localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });

    if (response.status === 201) {
      router.push("/encontros");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100vh",
      }}>
      <TextInput label="Título" ref={titleRef} />
      <TextInput label="Texto" ref={bodyRef} />
      <button type="submit">Publicar</button>
    </form>
  );
}
