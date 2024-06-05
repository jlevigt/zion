import { useRouter } from "next/router";
import { useEffect } from "react";

import MeetingList from "components/MeetingsList";
import Layout from "components/Layout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("auth");

      if (!token) {
        router.push("/login"); // Redireciona para a página de login se não houver autenticação
      } else {
        try {
          const response = await fetch("/api/v1/auth", {
            method: "GET",
            headers: {
              auth: `${JSON.parse(token)}`,
            },
          });

          if (response.status === 200) {
            console.log("Autenticado com sucesso!");
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      }
    };

    checkToken();
  }, []);

  return (
    <Layout>
      <MeetingList />
    </Layout>
  );
}
