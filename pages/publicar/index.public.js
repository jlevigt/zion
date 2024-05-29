import { useRouter } from "next/router";
import { useRef } from "react";
import DefaultLayout from "components/DefaultLayout";
import TextInput from "components/TextInput";

export default function Publicar() {
  return (
    <DefaultLayout>
      <PostForm />
    </DefaultLayout>
  );
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
        title,
        description,
        event_day: eventDay,
        event_time: eventTime,
        location,
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
        // height: "89vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <h1>Publicar</h1>
      <TextInput label="Título" ref={titleRef} />
      <TextInput label="Localização" ref={locationRef} />
      <TextInput label="Data do Evento" type="date" ref={eventDayRef} />
      <TextInput label="Hora do Evento" type="time" ref={eventTimeRef} />
      <TextInput label="Descrição" ref={descriptionRef} />
      <br />
      <button type="submit">Publicar</button>
    </form>
  );
}
