export default function HeaderComponent() {
  const headerStyle = {
    backgroundColor: "navy",
    color: "white",
    padding: "1rem",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const navListStyle = {
    listStyleType: "none",
    gap: "1rem",
    display: "flex",
    padding: 0,
    margin: 0,
  };

  const navItemStyle = {
    marginRight: "10px",
  };

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>Zion</li>
          <li style={navItemStyle}>
            <a
              href="/encontros"
              style={navLinkStyle}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}>
              Encontros
            </a>
          </li>
          <li style={navItemStyle}>
            <a
              href="/publicar"
              style={navLinkStyle}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}>
              Publicar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// TODO:
// Criar if para existência de user no LocalStorage
// Gerar interface com base no resultado de ifs
