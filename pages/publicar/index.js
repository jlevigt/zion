import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Publicar() {
  return (
    <Layout customContainerClass="form-container">
      <PostForm />
    </Layout>
  );
}

function PostForm() {
  const router = useRouter();

  const dayRef = useRef();
  const timeRef = useRef();
  const locationRef = useRef();
  const themeRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const day = dayRef.current.value;
    const time = timeRef.current.value;
    const location = locationRef.current.value;
    const theme = themeRef.current.value;

    try {
      const token = JSON.parse(localStorage.getItem("auth"));

      const response = await fetch("/api/v1/meetings", {
        method: "POST",
        headers: {
          auth: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: day,
          time: time,
          location: location,
          theme: theme,
        }),
      });

      if (response.status === 201) {
        return router.push("/encontros");
      }

      alert("Parece que houve um erro");
    } catch (error) {
      alert("Parece que houve um erro");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Publicar</h1>

      <label>Dia</label>
      <input ref={dayRef} type="date" lang="pt-BR"></input>

      <label>Horário _ _:_ _</label>
      <input ref={timeRef} type="time"></input>

      <label>Lugar</label>
      <input ref={locationRef}></input>

      <label>Tema</label>
      <input ref={themeRef}></input>

      <button type="submit" className="submit-button">
        Publicar
      </button>
    </form>
  );
}
