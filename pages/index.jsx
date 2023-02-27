import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import { Container } from 'react-bootstrap';
export default function HomePage() {
  return (
    <>
      <Head>
        <title>T-ACTIVE</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Container>
      
    </Container>
    </>
  );
}