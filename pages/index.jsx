import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import ResultNumber from 'container/Dashboard/ResultNumber';
import PeakGraph from 'container/Dashboard/PeakGraph';
import RecentSalse from 'container/Dashboard/RecentSalse';
import NewListing from 'container/Dashboard/NewListing';
export default function HomePage() {
  return (
    < >
      <Head>
        <title>HOME | dxx=</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResultNumber />
      {/* <PeakGraph /> */}
      <RecentSalse />
      {/* <NewListing /> */}
    </ >
  );
}
HomePage.layout = IndexPage;