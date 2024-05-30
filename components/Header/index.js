export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" className="button-link">
              Zion
            </a>
          </li>
          <li>
            <a href="/publicar" className="button-link">
              Publicar
            </a>
          </li>
          <li>
            <a href="/membros" className="button-link">
              Membros
            </a>
          </li>
          <li>
            <a href="/perfil" className="button-link">
              Perfil
            </a>
          </li>
          <li>
            <a href="/login" className="button-link">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
