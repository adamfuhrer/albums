import { useEffect, useState } from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import AlbumGallery from "../components/AlbumGallery";
import defaultAlbums from "../albums.json";

export default function Home() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    let localStorageAlbums = localStorage.getItem("albums");
    if (localStorageAlbums && JSON.parse(localStorageAlbums).length > 1) {
      setAlbums(JSON.parse(localStorageAlbums))
    } else {
      setAlbums(defaultAlbums);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Album Rotation</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Album Rotation" key="title" />
        <meta name="description" content="Organize and visualize your favorite albums"/>
      </Head>
      <main className={styles.main}>
        <a className={styles.github_link} title="Github repo" href="https://github.com/adamfuhrer/albums" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0" y="0" width="438.55"
            height="438.55" viewBox="0 0 438.55 438.55" xmlSpace="preserve" fill="none"
            enableBackground="new 0 0 438.549 438.549">
            <path d="M409.13 114.57c-19.61-33.6-46.2-60.19-79.8-79.8C295.74 15.17 259.06 5.37 219.27 5.37c-39.78 0-76.47 9.8-110.06 29.41 -33.6 19.61-60.19 46.2-79.8 79.8C9.8 148.17 0 184.85 0 224.63c0 47.78 13.94 90.75 41.83 128.91 27.88 38.16 63.91 64.57 108.06 79.23 5.14 0.95 8.95 0.28 11.42-2 2.48-2.28 3.71-5.14 3.71-8.56 0-0.57-0.05-5.71-0.14-15.42 -0.1-9.71-0.14-18.18-0.14-25.41l-6.57 1.14c-4.19 0.77-9.47 1.09-15.85 1 -6.37-0.09-12.99-0.76-19.84-2 -6.85-1.23-13.23-4.09-19.13-8.56 -5.9-4.47-10.09-10.33-12.56-17.56l-2.85-6.57c-1.9-4.37-4.9-9.23-8.99-14.56 -4.09-5.33-8.23-8.94-12.42-10.85l-2-1.43c-1.33-0.95-2.57-2.1-3.71-3.43 -1.14-1.33-2-2.66-2.57-4 -0.57-1.33-0.1-2.43 1.43-3.29 1.53-0.86 4.28-1.28 8.28-1.28l5.71 0.85c3.81 0.76 8.52 3.04 14.13 6.85 5.61 3.81 10.23 8.75 13.85 14.84 4.38 7.81 9.66 13.75 15.85 17.85 6.18 4.09 12.42 6.14 18.7 6.14 6.28 0 11.7-0.48 16.27-1.42 4.57-0.95 8.85-2.38 12.85-4.28 1.71-12.76 6.38-22.56 13.99-29.41 -10.85-1.14-20.6-2.86-29.26-5.14 -8.66-2.29-17.6-6-26.83-11.14 -9.23-5.14-16.9-11.52-22.98-19.13 -6.09-7.61-11.09-17.61-14.99-29.98 -3.9-12.37-5.85-26.65-5.85-42.83 0-23.03 7.52-42.64 22.56-58.82 -7.04-17.32-6.38-36.73 2-58.24 5.52-1.71 13.71-0.43 24.55 3.85 10.85 4.28 18.79 7.95 23.84 10.99 5.05 3.04 9.09 5.62 12.14 7.71 17.7-4.95 35.98-7.42 54.82-7.42s37.12 2.47 54.82 7.42l10.85-6.85c7.42-4.57 16.18-8.76 26.26-12.56 10.09-3.8 17.8-4.85 23.13-3.14 8.56 21.51 9.32 40.92 2.28 58.24 15.04 16.18 22.56 35.79 22.56 58.82 0 16.18-1.96 30.5-5.85 42.97 -3.9 12.47-8.94 22.46-15.12 29.98 -6.19 7.52-13.9 13.85-23.13 18.99 -9.23 5.14-18.18 8.85-26.84 11.14 -8.66 2.29-18.41 4-29.26 5.15 9.89 8.56 14.84 22.08 14.84 40.54v60.24c0 3.42 1.19 6.28 3.57 8.56 2.38 2.28 6.14 2.95 11.28 2 44.16-14.65 80.19-41.06 108.07-79.23 27.88-38.16 41.83-81.13 41.83-128.91C438.54 184.85 428.73 148.17 409.13 114.57z" />
          </svg>
        </a>
        {albums && <AlbumGallery isEditable={true} albumList={albums}></AlbumGallery>}
      </main>
    </div>
  );
}
