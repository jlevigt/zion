import Header from "components/Header";

export default function Layout({ children, customContainerClass }) {
  const containerClass = customContainerClass;
  return (
    <div>
      <Header />

      <div id="main" className={containerClass}>
        {children}
      </div>

      <hr
        style={{
          border: "none",
          borderBottom: "1px solid #ccc",
          borderRadius: "50%",
          width: "50%",
          margin: "20px auto",
        }}
      />

      <footer style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
        <p>
          Visite o repositório deste site no{" "}
          <a href="https://github.com/jlevigt/zion" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
