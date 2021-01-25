import Head from "next/head";
import styles from "../styles/Home.module.scss";
import AlbumGallery from "../components/AlbumGallery";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Album Rotation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AlbumGallery isEditable={true}></AlbumGallery>
        <AlbumGallery isEditable={false}></AlbumGallery>
      </main>
    </div>
  );
}
