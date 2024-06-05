import Layout from "components/Layout";

export default function Perfil() {
  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
}

function UserProfile() {
  return <p>Olá mundo</p>;
  // informações do usuário
  // opção para atualizar o username
}
