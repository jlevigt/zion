import MeetingList from "components/MeetingsList";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Page "/"
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    var larguraTela = window.innerWidth;
    var alturaTela = window.innerHeight;

    console.log("Largura da tela: " + larguraTela + "px");
    console.log("Altura da tela: " + alturaTela + "px");
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
            // A autenticação é válida, pode continuar na página Home
            console.log("Autenticado com sucesso!");
          } else {
            router.push("/login"); // Redireciona para a página de login se a autenticação falhar
          }
        } catch (error) {
          console.error("Erro ao verificar autenticação:", error);
          router.push("/login"); // Redireciona para a página de login em caso de erro
        }
      }
    };

    checkToken();
  }, []); // A lista de dependências está vazia para executar o efeito apenas uma vez após a montagem do componente

  return (
    <Layout>
      <MeetingList />
    </Layout>
  );
}
