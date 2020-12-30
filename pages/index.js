import MoviePicker from '../components/MoviePicker/MoviePicker'
import styles from '../styles/Home.module.css'
import Head from 'next/head'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movie Picker</title>
      </Head>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Can't Decide What To Watch?</h1>
        <h2 className={styles.subtitle}>Enter Movies Below And Let Technology Decide Your Fate...</h2>
      </div>
      <MoviePicker />
    </div>
  )
}
