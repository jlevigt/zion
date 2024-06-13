import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();

  const [role, setRole] = useState("waiting");

  const links = {
    leader: [
      { href: "/encontros", label: "Encontros" },
      { href: "/publicar", label: "Publicar" },
      { href: "/membros", label: "Membros" },
      { href: "/solicitacoes", label: "Solicitações" },
      { href: "/perfil", label: "Perfil" },
    ],
    member: [
      { href: "/encontros", label: "Encontros" },
      { href: "/membros", label: "Membros" },
      { href: "/perfil", label: "Perfil" },
    ],
    guest: [
      { href: "/encontros", label: "Encontros" },
      { href: "/perfil", label: "Perfil" },
    ],
    waiting: [{ href: "/perfil", label: "Perfil" }],
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setRole(user.role);
    }
  }, []);

  if (!role) {
    return <header />;
  }

  return (
    <header>
      <nav>
        <ul>
          {links[role].map((link) => (
            <li key={link.href}>
              <a href={link.href} className="button-link">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("auth");
                localStorage.removeItem("user");
                router.push("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
