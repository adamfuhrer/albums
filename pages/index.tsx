import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Album from '../components/album'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Albums</a>
        </h1> */}
        <Album name="Album name" img="this is the image"></Album>
      </main>
    </div>
  )
}
