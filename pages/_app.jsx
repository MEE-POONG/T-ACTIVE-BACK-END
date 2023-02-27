import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import 'assets/scss/index.scss';


import LoginPage from "./login.jsx";
import Layout from "components/layouts/IndexPage.jsx";



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={1 * 60}
      refetchOnWindowFocus={true}
    >
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </SessionProvider>
  );
}


function Auth({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return <LoginPage />
  }

  return children
}


export default MyApp;

