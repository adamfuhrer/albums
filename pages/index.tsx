import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Album from "../components/album";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Album name="Album name"></Album>
      <Album name="Album name"></Album>
      </main>
    </div>
  );
}
