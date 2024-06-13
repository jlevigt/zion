import "styles/globals.css";
import "styles/forms.css";
import "styles/lists.css";
import "styles/tables.css";

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
