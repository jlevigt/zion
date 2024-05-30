import Header from "components/Header";
// import Footer from "components/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      <div id="main">
        <br />
        {children}
      </div>

      {/* <Footer /> */}
    </div>
  );
}
