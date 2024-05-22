import HeaderComponent from "components/Header";

export default function DefaultLayout({ children }) {
  return (
    <div
      style={{
        backgroundColor: "navy",
      }}>
      <HeaderComponent />
      <div name="main" style={{ backgroundColor: "#000060" }}>
        {children}
      </div>
    </div>
  );
}
