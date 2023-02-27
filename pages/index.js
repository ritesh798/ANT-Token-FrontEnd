import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Approve from "@/components/Approve";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isWeb3Enabled } = useMoralis();
  return (
    <>
      <Head>
        <title>BockAnt Coin</title>
        <meta name="description" content="Erc  20 token for BlockAnt" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isWeb3Enabled ? (
        <div className={styles.main_section}>
          <Main /> <Approve />
        </div>
      ) : (
        <div className={styles.result}>Kindly connect your metamask</div>
      )}
    </>
  );
}
