import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Roni Analytics</title>
        <meta name="EMPOWERING INVESTORS WITH INSIGHTS USING PROPRIETARY AI TECHNOLOGY" content="Landing page of Roni Analytics" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar />
    </div>
  )
}
