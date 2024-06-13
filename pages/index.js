import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth");

    if (token) {
      router.push("/encontros");
      return;
    }

    router.push("/login");
  }, []);

  return <div>Olá mundo</div>;
}
