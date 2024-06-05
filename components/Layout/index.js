import Header from "components/Header";
// import Footer from "components/Footer";

export default function Layout({ children, customContainerClass }) {
  const containerClass = customContainerClass;
  return (
    <div>
      <Header />

      <div id="main" className={containerClass}>
        <br />
        {children}
      </div>

      {/* <Footer /> */}
    </div>
  );
}
