import "styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <html lang="pt-BR" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
