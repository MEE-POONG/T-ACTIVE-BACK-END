import React from "react";
import ReactDOM from "react-dom";
import { SessionProvider, useSession } from "next-auth/react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import 'assets/scss/index.scss';
// import 'assets/scss/value-tem.scss';


import PageChange from "../components/PageChange/PageChange.js";
import SSRProvider from 'react-bootstrap/SSRProvider';
import LoginPage from "./login.jsx";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../styles/tailwind.scss";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});


function Auth({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return <LoginPage />
  }

  return children
}


export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* Notus NextJS - v1.1.0 based on Tailwind Starter Kit by Creative Tim
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-nextjs
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <SessionProvider
        session={session}
        refetchInterval={1 * 60}
        refetchOnWindowFocus={true}
      >

        <SSRProvider>
          <React.Fragment>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>Notus NextJS by Creative Tim</title>
            </Head>
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          </React.Fragment>
        </SSRProvider>

      </SessionProvider>

    );
  }
}
