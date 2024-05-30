import { useRouter } from "next/router";
import { useRef } from "react";

export default function Publicar() {
  return <PostForm />;
}

function PostForm() {
  const router = useRouter();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const eventDayRef = useRef();
  const eventTimeRef = useRef();
  const locationRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const eventDay = eventDayRef.current.value;
    const eventTime = eventTimeRef.current.value;
    const location = locationRef.current.value;

    const response = await fetch("/api/v1/contents", {
      method: "POST",
      headers: {
        auth: localStorage.getItem("auth"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        event_day: eventDay,
        event_time: eventTime,
        location: location,
      }),
    });

    if (response.status === 201) {
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Publicar</h1>
      <label>Título</label>
      <br />
      <input ref={titleRef}></input>
      <br />
      <label>Localização</label>
      <br />
      <input ref={locationRef}></input>
      <br />
      <label>Dia</label>
      <br />
      <input ref={eventDayRef}></input>
      <br />
      <label>Horário</label>
      <br />
      <input ref={eventTimeRef}></input>
      <br />
      <label>Descrição</label>
      <br />
      <input ref={descriptionRef}></input>
      <br />
      <button type="submit">Publicar</button>
    </form>
  );
}
